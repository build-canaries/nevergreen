import React from 'react'
import userEvent from '@testing-library/user-event'
import {waitForDomChange} from '@testing-library/react'
import {Externally} from '../../../../../src/client/backup/import/externally/Externally'
import {render} from '../../../testHelpers'
import {BackupLocation} from '../../../../../src/client/backup/BackupActionCreators'
import * as gateway from '../../../../../src/client/gateways/Gateway'
import {fakeRequest} from '../../../../../src/client/gateways/Gateway'
import * as backupGateway from '../../../../../src/client/gateways/BackupGateway'

describe('import <Externally/>', () => {

  const DEFAULT_PROPS = {
    location: BackupLocation.GITHUB,
    help: <div/>,
    accessTokenRequired: undefined
  }

  beforeEach(() => {
    jest.spyOn(backupGateway, 'importConfiguration').mockReturnValue(fakeRequest({configuration: '{}'}))
  })

  test('should import configuration when an ID and URL are given', async () => {
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false
    }
    const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
    await userEvent.type(getByLabelText('ID'), 'some-id')
    await userEvent.type(getByLabelText('URL'), 'some-url')
    userEvent.click(getByText('import'))

    await waitForDomChange()

    expect(backupGateway.importConfiguration).toHaveBeenCalledWith(BackupLocation.GITHUB, 'some-id', '', 'some-url')
    expect(queryByText('Successfully imported configuration')).toBeInTheDocument()
  })

  test('should not import configuration when access token is required but not provided', async () => {
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: true
    }
    const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
    await userEvent.type(getByLabelText('ID'), 'some-id')
    await userEvent.type(getByLabelText('URL'), 'some-url')
    userEvent.click(getByText('import'))

    expect(queryByText('You must provide an access token to import')).toBeInTheDocument()
    expect(backupGateway.importConfiguration).not.toHaveBeenCalled()
  })

  test('should not import configuration when ID is missing', async () => {
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false
    }
    const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
    await userEvent.type(getByLabelText('URL'), 'some-url')
    userEvent.click(getByText('import'))

    expect(queryByText('You must provide an ID to import')).toBeInTheDocument()
    expect(backupGateway.importConfiguration).not.toHaveBeenCalled()
  })

  test('should not import configuration when URL is missing', async () => {
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false
    }
    const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
    await userEvent.type(getByLabelText('ID'), 'some-id')
    userEvent.click(getByText('import'))

    expect(queryByText('You must provide a URL to import from')).toBeInTheDocument()
    expect(backupGateway.importConfiguration).not.toHaveBeenCalled()
  })

  test('should display an message if an error occurs while importing', async () => {
    jest.spyOn(gateway, 'send').mockRejectedValue({message: 'some remote error'})
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false
    }

    const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
    await userEvent.type(getByLabelText('ID'), 'some-id')
    await userEvent.type(getByLabelText('URL'), 'some-url')
    userEvent.click(getByText('import'))

    await waitForDomChange()

    expect(queryByText('some remote error')).toBeInTheDocument()
  })

  test('should display an message if the imported configuration is invalid', async () => {
    jest.spyOn(backupGateway, 'importConfiguration').mockReturnValue(fakeRequest({configuration: '{'}))
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false
    }

    const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
    await userEvent.type(getByLabelText('ID'), 'some-id')
    await userEvent.type(getByLabelText('URL'), 'some-url')
    userEvent.click(getByText('import'))

    await waitForDomChange()

    expect(queryByText('Unexpected end of JSON input')).toBeInTheDocument()
  })
})
