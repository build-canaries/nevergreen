import React from 'react'
import userEvent from '@testing-library/user-event'
import {waitForDomChange} from '@testing-library/react'
import {Externally} from '../../../../../src/client/backup/export/externally/Externally'
import {render} from '../../../testHelpers'
import {BackupLocation} from '../../../../../src/client/backup/BackupActionCreators'
import {fakeRequest} from '../../../../../src/client/gateways/Gateway'
import * as backupGateway from '../../../../../src/client/gateways/BackupGateway'

const DEFAULT_PROPS = {
  location: BackupLocation.GITHUB,
  help: <div/>
}

beforeEach(() => {
  jest.spyOn(backupGateway, 'exportConfiguration').mockReturnValue(fakeRequest({id: 'some-id'}))
})

it('should export if an access token was entered', async () => {
  const {getByTestId, getByText, getByLabelText, queryByText} = render(<Externally {...DEFAULT_PROPS} />)
  await userEvent.type(getByLabelText('URL'), 'some-url')
  await userEvent.type(getByLabelText('ID'), 'some-id')
  await userEvent.type(getByTestId('access-token'), 'some-access-token')
  await userEvent.type(getByLabelText('description'), 'some-description')
  userEvent.click(getByText('export'))

  await waitForDomChange()

  expect(backupGateway.exportConfiguration).toHaveBeenCalledWith(
    BackupLocation.GITHUB,
    'some-id',
    'some-description',
    expect.any(String),
    'some-access-token',
    'some-url'
  )
  expect(queryByText('Successfully exported configuration')).toBeInTheDocument()
})

it('should not try and export if no access token was entered', async () => {
  const {getByText, queryByText} = render(<Externally {...DEFAULT_PROPS} />)
  userEvent.click(getByText('export'))
  expect(backupGateway.exportConfiguration).not.toHaveBeenCalled()
  expect(queryByText('You must provide an access token to export')).toBeInTheDocument()
})
