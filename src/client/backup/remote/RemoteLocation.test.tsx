import React from 'react'
import userEvent from '@testing-library/user-event'
import {buildRemoteBackupLocation, render} from '../../testHelpers'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import * as BackupGateway from '../../gateways/BackupGateway'
import {fakeRequest} from '../../gateways/Gateway'
import {RemoteLocation} from './RemoteLocation'
import {toExportableConfigurationJson} from '../../configuration/Configuration'
import {waitFor} from '@testing-library/react'

beforeEach(() => {
  jest.spyOn(BackupGateway, 'exportConfigurationNew').mockResolvedValue(fakeRequest(''))
  jest.spyOn(BackupGateway, 'fetchConfigurationNew').mockResolvedValue(fakeRequest(''))
})

it('should display the URL for custom servers', () => {
  const location = buildRemoteBackupLocation({where: RemoteLocationOptions.Custom, url: 'http://some-custom-server'})
  const {queryByText} = render(<RemoteLocation location={location}/>)
  expect(queryByText('http://some-custom-server')).toBeInTheDocument()
})

it('should be able to export', async () => {
  const location = buildRemoteBackupLocation()

  const {getByText, store, queryByText} = render(<RemoteLocation location={location}/>)
  userEvent.click(getByText('Export now'))

  await waitFor(() => {
    expect(BackupGateway.exportConfigurationNew).toHaveBeenCalledWith(location, toExportableConfigurationJson(store.getState()))
    expect(queryByText('Last successful export <1m ago'))
  })
})

it('should show an error message if the export fails for any reason', async () => {
  jest.spyOn(BackupGateway, 'exportConfigurationNew').mockRejectedValue(new Error())
  const location = buildRemoteBackupLocation()

  const {getByText, queryByText} = render(<RemoteLocation location={location}/>)
  userEvent.click(getByText('Export now'))

  await waitFor(() => {
    expect(queryByText('Unable to export because of an error, please try again'))
  })
})

it('should be able to import', async () => {
  const location = buildRemoteBackupLocation({
    where: RemoteLocationOptions.GitHub,
    externalId: 'some-external-id',
    encryptedAccessToken: 'encrypted-token',
    url: 'some-url'
  })

  const {getByText, queryByText} = render(<RemoteLocation location={location}/>)
  userEvent.click(getByText('Import now'))

  await waitFor(() => {
    expect(BackupGateway.fetchConfigurationNew).toHaveBeenCalledWith(location)
    expect(queryByText('Last successful import <1m ago'))
  })
})

it('should show an error message if the import fails for any reason', async () => {
  jest.spyOn(BackupGateway, 'fetchConfigurationNew').mockRejectedValue(new Error())

  const location = buildRemoteBackupLocation({
    where: RemoteLocationOptions.GitHub,
    externalId: 'some-external-id',
    encryptedAccessToken: 'encrypted-token',
    url: 'some-url'
  })

  const {getByText, queryByText} = render(<RemoteLocation location={location}/>)
  userEvent.click(getByText('Import now'))

  await waitFor(() => {
    expect(queryByText('Unable to import because of an error, please try again'))
  })
})

describe('GitHub gists', () => {

  it('should display the description', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitHub,
      description: 'some description'
    })
    const {queryByText} = render(<RemoteLocation location={location}/>)
    expect(queryByText('"some description"')).toBeInTheDocument()
  })

  it('should display the URL', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitHub,
      url: 'http://some-custom-github-url'
    })
    const {queryByText} = render(<RemoteLocation location={location}/>)
    expect(queryByText('GitHub Enterprise gist')).toBeInTheDocument()
    expect(queryByText('http://some-custom-github-url')).toBeInTheDocument()
  })
})

describe('GitLab snippets', () => {

  it('should display the description', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitLab,
      description: 'some description'
    })
    const {queryByText} = render(<RemoteLocation location={location}/>)
    expect(queryByText('"some description"')).toBeInTheDocument()
  })

  it('should display the URL', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitLab,
      url: 'http://some-custom-gitlab-url'
    })
    const {queryByText} = render(<RemoteLocation location={location}/>)
    expect(queryByText('http://some-custom-gitlab-url')).toBeInTheDocument()
  })
})
