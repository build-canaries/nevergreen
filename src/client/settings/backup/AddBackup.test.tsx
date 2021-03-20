import React from 'react'
import userEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import {render} from '../../testHelpers'
import {DEFAULT_GITHUB_URL} from './RemoteLocationOptions'
import * as SecurityGateway from '../../gateways/SecurityGateway'
import {fakeRequest} from '../../gateways/Gateway'
import {AddBackup} from './AddBackup'
import {getBackupLocations} from './RemoteLocationsReducer'
import {ROUTE_SETTINGS} from '../../Routes'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue(fakeRequest(''))
})

it('should not be able to add with a blank URL', async () => {
  const {getByText, getByLabelText, queryByText} = render(<AddBackup/>)

  userEvent.selectOptions(getByLabelText('Where'), 'custom')
  userEvent.click(getByText('Add location'))

  await waitFor(() => {
    expect(queryByText('Enter a URL')).toBeInTheDocument()
  })
})

it('should not be able to add with a non http(s) URL', async () => {
  const {getByText, getByLabelText, queryByText} = render(<AddBackup/>)

  userEvent.selectOptions(getByLabelText('Where'), 'custom')
  userEvent.type(getByLabelText('URL'), 'file://example')
  userEvent.click(getByText('Add location'))

  await waitFor(() => {
    expect(queryByText('Only http and https URLs are supported')).toBeInTheDocument()
  })
})

it('should be able to add a custom server', async () => {
  const {getByText, getByLabelText, store, history} = render(<AddBackup/>)

  userEvent.selectOptions(getByLabelText('Where'), 'custom')
  userEvent.type(getByLabelText('URL'), 'http://example.com')
  userEvent.click(getByText('Add location'))

  await waitFor(() => {
    expect(Object.values(getBackupLocations(store.getState()))).toEqual([expect.objectContaining({
      where: 'custom',
      url: 'http://example.com'
    })])
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
  })
})

it('should be able to add a GitHub gist', async () => {
  const {getByText, getByLabelText, store, history} = render(<AddBackup/>)

  userEvent.selectOptions(getByLabelText('Where'), 'github')

  expect(getByLabelText('URL')).toHaveValue(DEFAULT_GITHUB_URL)

  userEvent.type(getByLabelText('Access token'), 'some-token')
  userEvent.click(getByText('Add location'))

  await waitFor(() => {
    expect(Object.values(getBackupLocations(store.getState()))).toEqual([expect.objectContaining({
      where: 'github'
    })])
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
  })
})

it('should not be able to add a GitHub gist with a blank access token', async () => {
  const {getByText, getByLabelText, queryByText} = render(<AddBackup/>)

  userEvent.selectOptions(getByLabelText('Where'), 'github')
  userEvent.click(getByText('Add location'))

  await waitFor(() => {
    expect(queryByText('Enter an access token')).toBeInTheDocument()
  })
})
