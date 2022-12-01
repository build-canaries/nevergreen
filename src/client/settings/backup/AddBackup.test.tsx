import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {render} from '../../testUtils/testHelpers'
import {DEFAULT_GITHUB_URL} from './RemoteLocationOptions'
import * as SecurityGateway from '../../gateways/SecurityGateway'
import {AddBackup} from './AddBackup'
import {getBackupLocations} from './RemoteLocationsReducer'
import * as Feed from '../../domain/Feed'

beforeEach(() => {
  jest.spyOn(SecurityGateway, 'encrypt').mockResolvedValue('')
})

it('should not be able to add with a blank URL', async () => {
  const {user} = render(<AddBackup/>)

  await user.selectOptions(screen.getByLabelText('Where'), 'custom')
  await user.click(screen.getByRole('button', {name: 'Add location'}))

  await waitFor(() => {
    expect(screen.getByText('Enter a URL')).toBeInTheDocument()
  })
})

it('should not be able to add with a non http(s) URL', async () => {
  const {user} = render(<AddBackup/>)

  await user.selectOptions(screen.getByLabelText('Where'), 'custom')
  await user.type(screen.getByLabelText('URL'), 'file://example')
  await user.click(screen.getByRole('button', {name: 'Add location'}))

  await waitFor(() => {
    expect(screen.getByText('Only http and https URLs are supported')).toBeInTheDocument()
  })
})

it('should be able to add a custom server', async () => {
  jest.spyOn(Feed, 'createId').mockReturnValue('some-id')

  const {store, user} = render(<AddBackup/>)

  await user.selectOptions(screen.getByLabelText('Where'), 'custom')
  await user.type(screen.getByLabelText('URL'), 'http://example.com')
  await user.click(screen.getByRole('button', {name: 'Add location'}))

  await waitFor(() => {
    expect(Object.values(getBackupLocations(store.getState()))).toEqual([expect.objectContaining({
      where: 'custom',
      url: 'http://example.com'
    })])
  })
  expect(window.location.pathname).toMatch('/settings/backup/some-id/details')
})

it('should be able to add a GitHub gist', async () => {
  jest.spyOn(Feed, 'createId').mockReturnValue('some-id')

  const {store, user} = render(<AddBackup/>)

  await user.selectOptions(screen.getByLabelText('Where'), 'github')

  expect(screen.getByLabelText('URL')).toHaveValue(DEFAULT_GITHUB_URL)

  await user.type(screen.getByLabelText('Access token'), 'some-token')
  await user.click(screen.getByRole('button', {name: 'Add location'}))

  await waitFor(() => {
    expect(Object.values(getBackupLocations(store.getState()))).toEqual([expect.objectContaining({
      where: 'github'
    })])
  })
  expect(window.location.pathname).toEqual('/settings/backup/some-id/details')
})

it('should validate adding a GitHub gist and clear errors if "where" is changed', async () => {
  const {user} = render(<AddBackup/>)

  await user.selectOptions(screen.getByLabelText('Where'), 'github')
  await user.clear(screen.getByLabelText('URL'))
  await user.click(screen.getByRole('button', {name: 'Add location'}))

  await waitFor(() => {
    expect(screen.getByText('Enter a URL')).toBeInTheDocument()
  })
  expect(screen.getByText('Enter an access token')).toBeInTheDocument()

  await user.selectOptions(screen.getByLabelText('Where'), 'custom')

  await waitFor(() => {
    expect(screen.queryByText('Enter a URL')).not.toBeInTheDocument()
  })
  expect(screen.queryByText('Enter an access token')).not.toBeInTheDocument()
})
