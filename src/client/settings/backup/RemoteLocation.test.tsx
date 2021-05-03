import React from 'react'
import {buildRemoteBackupLocation, render} from '../../testHelpers'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import {RemoteLocation} from './RemoteLocation'
import {screen} from '@testing-library/react'

describe('custom server', () => {

  it('should display the URL', () => {
    const location = buildRemoteBackupLocation({where: RemoteLocationOptions.Custom, url: 'http://some-custom-server'})
    render(<RemoteLocation location={location}/>)
    expect(screen.queryByText('http://some-custom-server')).toBeInTheDocument()
  })
})

describe('GitHub gists', () => {

  it('should display the description', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitHub,
      description: 'some description'
    })
    render(<RemoteLocation location={location}/>)
    expect(screen.queryByText('"some description"')).toBeInTheDocument()
  })

  it('should display the URL', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitHub,
      url: 'http://some-custom-github-url'
    })
    render(<RemoteLocation location={location}/>)
    expect(screen.queryByText('GitHub Enterprise gist')).toBeInTheDocument()
    expect(screen.queryByText('http://some-custom-github-url')).toBeInTheDocument()
  })
})

describe('GitLab snippets', () => {

  it('should display the description', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitLab,
      description: 'some description'
    })
    render(<RemoteLocation location={location}/>)
    expect(screen.queryByText('"some description"')).toBeInTheDocument()
  })

  it('should display the URL', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitLab,
      url: 'http://some-custom-gitlab-url'
    })
    render(<RemoteLocation location={location}/>)
    expect(screen.queryByText('http://some-custom-gitlab-url')).toBeInTheDocument()
  })
})
