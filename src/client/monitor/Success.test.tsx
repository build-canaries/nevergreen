import React from 'react'
import {Success} from './Success'
import {render} from '../testUtils/testHelpers'
import {successRoot} from '../settings/success/SuccessReducer'
import {screen, waitFor} from '@testing-library/react'
import {buildFeedError, buildProject} from '../testUtils/builders'
import {Prognosis} from '../domain/Project'
import {settingsRoot} from '../settings/SettingsReducer'
import * as Utils from '../common/Utils'

it('should only switch the message on a new success state not every refresh', async () => {
  jest.spyOn(Utils, 'randomFrom')
    .mockReturnValueOnce('foo')
    .mockReturnValueOnce('bar')
  const state = {
    [settingsRoot]: {
      showPrognosis: [Prognosis.sick]
    },
    [successRoot]: ['foo', 'bar']
  }

  const {rerender} = render(<Success projects={[]} feedErrors={[]}/>, {state})

  rerender(<Success projects={[]} feedErrors={[]}/>)
  expect(screen.getByText('foo')).toBeInTheDocument()

  rerender(<Success projects={[]} feedErrors={[]}/>)
  expect(screen.getByText('foo')).toBeInTheDocument()

  rerender(<Success projects={[buildProject({prognosis: Prognosis.sick})]} feedErrors={[]}/>)

  rerender(<Success projects={[]} feedErrors={[]}/>)
  await waitFor(() => {
    expect(screen.getByText('bar')).toBeInTheDocument()
  })
})

it('should render text messages', () => {
  const state = {[successRoot]: ['some-message']}
  render(<Success projects={[]} feedErrors={[]}/>, {state})
  expect(screen.getByText('some-message')).toBeInTheDocument()
})

it('should render images', () => {
  const state = {[successRoot]: ['http://some-url']}
  render(<Success projects={[]} feedErrors={[]}/>, {state})
  expect(screen.getByRole('img')).toHaveAttribute('src', 'http://some-url')
})

it('should render nothing if there are no success messages', () => {
  const state = {[successRoot]: []}
  const {container} = render(<Success projects={[]} feedErrors={[]}/>, {state})
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should render nothing if not successful due to an error', () => {
  const state = {[successRoot]: ['some-message']}
  const {container} = render(<Success projects={[]} feedErrors={[buildFeedError()]}/>, {state})
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should render nothing if not successful due to an interesting project', () => {
  const state = {
    [settingsRoot]: {
      showPrognosis: [Prognosis.sick]
    },
    [successRoot]: ['some-message']
  }
  const projects = [buildProject({prognosis: Prognosis.sick})]
  const {container} = render(<Success projects={projects} feedErrors={[]}/>, {state})
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should render a message if only uninteresting projects', () => {
  const state = {
    [settingsRoot]: {
      showPrognosis: [Prognosis.sick]
    },
    [successRoot]: ['some-message']
  }
  const projects = [buildProject({prognosis: Prognosis.healthy})]
  render(<Success projects={projects} feedErrors={[]}/>, {state})
  expect(screen.getByText('some-message')).toBeInTheDocument()
})
