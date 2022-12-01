import React from 'react'
import {fakeRequest, render} from '../../testUtils/testHelpers'
import {screen, waitFor} from '@testing-library/react'
import {TestConnection} from './TestConnection'
import {AuthTypes} from '../../domain/Feed'
import * as ProjectsGateway from '../../gateways/ProjectsGateway'
import * as Gateway from '../../gateways/Gateway'

const details = {
  url: 'http://some-url',
  authType: AuthTypes.none,
  username: '',
  password: '',
  accessToken: ''
}

it('should update the button text while loading', async () => {
  const promise = new Promise((resolve) => setTimeout(resolve, 1))
  jest.spyOn(Gateway, 'send').mockReturnValueOnce(promise)
  const {user} = render(<TestConnection details={details}/>)
  await user.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('Checking connection...')).toBeInTheDocument()
  })
})

it('should display messages about the connection', async () => {
  jest.spyOn(ProjectsGateway, 'testFeedConnection')
    .mockResolvedValueOnce(fakeRequest(undefined))
    .mockRejectedValueOnce(new Error('some error happened'))

  const {user} = render(<TestConnection details={details}/>)

  await user.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', {name: 'Dismiss success messages'}))
  await waitFor(() => {
    expect(screen.queryByText('Connected successfully')).not.toBeInTheDocument()
  })
  await user.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('some error happened')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', {name: 'Dismiss error messages'}))
  await waitFor(() => {
    expect(screen.queryByText('some error happened')).not.toBeInTheDocument()
  })
})
