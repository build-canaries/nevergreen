import React from 'react'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
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
  render(<AddBackup/>)

  userEvent.selectOptions(screen.getByLabelText('Where'), 'custom')
  userEvent.click(screen.getByText('Add location'))

  await waitFor(() => {
    expect(screen.queryByText('Enter a URL')).toBeInTheDocument()
  })
})

it('should not be able to add with a non http(s) URL', async () => {
  render(<AddBackup/>)

  userEvent.selectOptions(screen.getByLabelText('Where'), 'custom')
  userEvent.type(screen.getByLabelText('URL'), 'file://example')
  userEvent.click(screen.getByText('Add location'))

  await waitFor(() => {
    expect(screen.queryByText('Only http and https URLs are supported')).toBeInTheDocument()
  })
})

it('should be able to add a custom server', async () => {
  const {store, history} = render(<AddBackup/>)

  userEvent.selectOptions(screen.getByLabelText('Where'), 'custom')
  userEvent.type(screen.getByLabelText('URL'), 'http://example.com')
  userEvent.click(screen.getByRole('button', {name: 'Add location'}))

  await waitFor(() => {
    expect(Object.values(getBackupLocations(store.getState()))).toEqual([expect.objectContaining({
      where: 'custom',
      url: 'http://example.com'
    })])
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
  })
})

it('should be able to add a GitHub gist', async () => {
  const {store, history} = render(<AddBackup/>)

  userEvent.selectOptions(screen.getByLabelText('Where'), 'github')

  expect(screen.getByLabelText('URL')).toHaveValue(DEFAULT_GITHUB_URL)

  userEvent.type(screen.getByLabelText('Access token'), 'some-token')
  userEvent.click(screen.getByRole('button', {name: 'Add location'}))

  await waitFor(() => {
    expect(Object.values(getBackupLocations(store.getState()))).toEqual([expect.objectContaining({
      where: 'github'
    })])
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
  })
})

it('should validate adding a GitHub gist and clear errors if "where" is changed', async () => {
  render(<AddBackup/>)

  userEvent.selectOptions(screen.getByLabelText('Where'), 'github')
  userEvent.clear(screen.getByLabelText('URL'))
  userEvent.click(screen.getByText('Add location'))

  await waitFor(() => {
    expect(screen.queryByText('Enter a URL')).toBeInTheDocument()
    expect(screen.queryByText('Enter an access token')).toBeInTheDocument()
  })

  userEvent.selectOptions(screen.getByLabelText('Where'), 'custom')

  await waitFor(() => {
    expect(screen.queryByText('Enter a URL')).not.toBeInTheDocument()
    expect(screen.queryByText('Enter an access token')).not.toBeInTheDocument()
  })
})
