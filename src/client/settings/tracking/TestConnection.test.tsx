import React from 'react'
import {render} from '../../testHelpers'
import {screen, waitFor} from '@testing-library/react'
import {TestConnection} from './TestConnection'
import {AuthTypes} from '../../domain/Feed'
import * as ProjectsGateway from '../../gateways/ProjectsGateway'
import {fakeRequest} from '../../gateways/Gateway'

const details = {
  url: 'http://some-url',
  authType: AuthTypes.none,
  username: '',
  password: '',
  accessToken: ''
}

it('should update the button text while loading', async () => {
  jest.spyOn(ProjectsGateway, 'testFeedConnection').mockResolvedValue(fakeRequest(undefined))
  const {user} = render(<TestConnection details={details}/>)
  const click = user.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('Checking connection...')).toBeInTheDocument()
  })
  await click // wait for effects of the click otherwise it causes the next test to fail
})

it('should display messages about the connection', async () => {
  const testFeedConnectionSpy = jest.spyOn(ProjectsGateway, 'testFeedConnection')

  const {user} = render(<TestConnection details={details}/>)

  testFeedConnectionSpy.mockResolvedValueOnce(fakeRequest(undefined))
  await user.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('Connected successfully')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', {name: 'Dismiss success messages'}))
  await waitFor(() => {
    expect(screen.queryByText('Connected successfully')).not.toBeInTheDocument()
  })

  testFeedConnectionSpy.mockRejectedValueOnce(new Error('some error happened'))
  await user.click(screen.getByRole('button', {name: 'Check connection'}))
  await waitFor(() => {
    expect(screen.getByText('some error happened')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', {name: 'Dismiss error messages'}))
  await waitFor(() => {
    expect(screen.queryByText('some error happened')).not.toBeInTheDocument()
  })
})
