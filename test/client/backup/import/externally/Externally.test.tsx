import React from 'react'
import userEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import {Externally} from '../../../../../src/client/backup/import/externally/Externally'
import {buildState, render} from '../../../testHelpers'
import {BackupLocation} from '../../../../../src/client/backup/BackupActionCreators'
import * as Gateway from '../../../../../src/client/gateways/Gateway'
import {fakeRequest} from '../../../../../src/client/gateways/Gateway'
import * as BackupGateway from '../../../../../src/client/gateways/BackupGateway'
import {toJson} from '../../../../../src/client/common/Json'

const DEFAULT_PROPS = {
  location: BackupLocation.GITHUB,
  help: <div/>,
  accessTokenRequired: undefined
}

beforeEach(() => {
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({configuration: toJson(buildState())}))
})

it('should import configuration when an ID and URL are given', async () => {
  const props = {
    ...DEFAULT_PROPS,
    accessTokenRequired: false
  }
  const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
  await userEvent.type(getByLabelText('ID'), 'some-id')
  await userEvent.type(getByLabelText('URL'), 'some-url')
  userEvent.click(getByText('Import'))

  await waitFor(() => {
    expect(BackupGateway.fetchConfiguration).toHaveBeenCalledWith(BackupLocation.GITHUB, 'some-id', '', 'some-url')
    expect(queryByText('Successfully imported configuration')).toBeInTheDocument()
  })
})

it('should not import configuration when access token is required but not provided', async () => {
  const props = {
    ...DEFAULT_PROPS,
    accessTokenRequired: true
  }
  const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
  await userEvent.type(getByLabelText('ID'), 'some-id')
  await userEvent.type(getByLabelText('URL'), 'some-url')
  userEvent.click(getByText('Import'))

  expect(queryByText('You must provide an access token to import')).toBeInTheDocument()
  expect(BackupGateway.fetchConfiguration).not.toHaveBeenCalled()
})

it('should not import configuration when ID is missing', async () => {
  const props = {
    ...DEFAULT_PROPS,
    accessTokenRequired: false
  }
  const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
  await userEvent.type(getByLabelText('URL'), 'some-url')
  userEvent.click(getByText('Import'))

  expect(queryByText('You must provide an ID to import')).toBeInTheDocument()
  expect(BackupGateway.fetchConfiguration).not.toHaveBeenCalled()
})

it('should not import configuration when URL is missing', async () => {
  const props = {
    ...DEFAULT_PROPS,
    accessTokenRequired: false
  }
  const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
  await userEvent.type(getByLabelText('ID'), 'some-id')
  userEvent.click(getByText('Import'))

  expect(queryByText('You must provide a URL to import from')).toBeInTheDocument()
  expect(BackupGateway.fetchConfiguration).not.toHaveBeenCalled()
})

it('should display an message if an error occurs while importing', async () => {
  jest.spyOn(Gateway, 'send').mockRejectedValue({message: 'some remote error'})
  const props = {
    ...DEFAULT_PROPS,
    accessTokenRequired: false
  }

  const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
  await userEvent.type(getByLabelText('ID'), 'some-id')
  await userEvent.type(getByLabelText('URL'), 'some-url')
  userEvent.click(getByText('Import'))

  await waitFor(() => {
    expect(queryByText('some remote error')).toBeInTheDocument()
  })
})

it('should display an message if the imported configuration is invalid', async () => {
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({configuration: '{'}))
  const props = {
    ...DEFAULT_PROPS,
    accessTokenRequired: false
  }

  const {getByLabelText, getByText, queryByText} = render(<Externally {...props} />)
  await userEvent.type(getByLabelText('ID'), 'some-id')
  await userEvent.type(getByLabelText('URL'), 'some-url')
  userEvent.click(getByText('Import'))

  await waitFor(() => {
    expect(queryByText('Unexpected end of JSON input')).toBeInTheDocument()
  })
})
