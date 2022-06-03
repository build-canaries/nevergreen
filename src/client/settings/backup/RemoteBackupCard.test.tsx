import React from 'react'
import {buildRemoteBackupLocation, render} from '../../testHelpers'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import {RemoteBackupCard} from './RemoteBackupCard'
import {screen} from '@testing-library/react'

describe('custom server', () => {

  it('should display the URL', () => {
    const location = buildRemoteBackupLocation({where: RemoteLocationOptions.custom, url: 'http://some-custom-server'})
    render(<RemoteBackupCard location={location}/>)
    expect(screen.getByText('http://some-custom-server')).toBeInTheDocument()
  })
})

describe('GitHub gists', () => {

  it('should display the description', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.gitHub,
      description: 'some description'
    })
    render(<RemoteBackupCard location={location}/>)
    expect(screen.getByText('some description')).toBeInTheDocument()
  })
})

describe('GitLab snippets', () => {

  it('should display the description', () => {
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.gitLab,
      description: 'some description'
    })
    render(<RemoteBackupCard location={location}/>)
    expect(screen.getByText('some description')).toBeInTheDocument()
  })
})
