import React from 'react'
import {render} from '../testHelpers'
import {screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {TestConnection} from './TestConnection'
import {AuthTypes} from '../domain/Tray'
import * as ProjectsGateway from '../gateways/ProjectsGateway'
import {fakeRequest} from '../gateways/Gateway'

const details = {
  url: 'http://some-url',
  authType: AuthTypes.none,
  username: '',
  password: '',
  accessToken: ''
}

it('should update the button text while loading', async () => {
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))
  render(<TestConnection details={details}/>)
  userEvent.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('Checking connection...')).toBeInTheDocument()
  })
})

it('should display messages about the connection', async () => {
  const testFeedConnectionSpy = jest.spyOn(ProjectsGateway, 'testFeedConnection')

  render(<TestConnection details={details}/>)

  testFeedConnectionSpy.mockResolvedValueOnce(fakeRequest(undefined))
  userEvent.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })

  testFeedConnectionSpy.mockRejectedValueOnce(new Error('some error happened'))
  userEvent.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('some error happened')).toBeInTheDocument()
  })
})
