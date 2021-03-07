import React from 'react'
import {buildRemoteBackupLocation, render} from '../../testHelpers'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import {RemoteLocation} from './RemoteLocation'

describe('custom server', () => {

  it('should display the URL', () => {
    const location = buildRemoteBackupLocation({where: RemoteLocationOptions.Custom, url: 'http://some-custom-server'})
    const {queryByText} = render(<RemoteLocation location={location}/>)
    expect(queryByText('http://some-custom-server')).toBeInTheDocument()
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
