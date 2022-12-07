import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {render, waitForLoadingToFinish} from '../../../testUtils/testHelpers'
import {buildFeed, buildFeedError, buildProject} from '../../../testUtils/builders'
import * as Gateway from '../../../gateways/Gateway'
import {AvailableProjects} from './AvailableProjects'
import {feedsRoot} from '../FeedsReducer'
import {selectedRoot} from '../SelectedReducer'

beforeEach(() => {
  jest.spyOn(Gateway, 'post').mockResolvedValue([])
})

it('should be able to select projects', async () => {
  const feed = buildFeed({trayId: 'trayId'})
  const project = buildProject({trayId: 'trayId', projectId: 'projectId', description: 'some project'})
  const state = {
    [feedsRoot]: {
      trayId: feed
    },
    [selectedRoot]: {
      trayId: []
    }
  }
  jest.spyOn(Gateway, 'post').mockResolvedValue([project])

  const {user} = render(<AvailableProjects feed={feed}/>, {state})

  await waitForLoadingToFinish()

  const selectInput = screen.getByLabelText(/some project/)

  expect(selectInput).not.toBeChecked()

  await user.click(selectInput as Element)
  expect(selectInput).toBeChecked()
})

it('should correctly show and remove errors returned while refreshing', async () => {
  jest.spyOn(Gateway, 'post')
    .mockResolvedValueOnce([
      buildFeedError({description: 'some-error'})
    ])
    .mockResolvedValueOnce([
      buildProject()
    ])
  const feed = buildFeed({trayId: 'trayId'})
  const state = {
    [feedsRoot]: {
      trayId: feed
    },
    [selectedRoot]: {
      trayId: []
    }
  }

  const {user} = render(<AvailableProjects feed={feed}/>, {state})
  await waitForLoadingToFinish()

  await waitFor(() => {
    expect(screen.getByText('some-error')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', {name: 'Refresh'}))

  await waitFor(() => {
    expect(screen.queryByText('some-error')).not.toBeInTheDocument()
  })
})

it('should show a warning if there are no projects', async () => {
  const feed = buildFeed({trayId: 'trayId'})
  const state = {
    [feedsRoot]: {
      trayId: feed
    },
    [selectedRoot]: {
      trayId: []
    }
  }
  jest.spyOn(Gateway, 'post').mockResolvedValue([])

  render(<AvailableProjects feed={feed}/>, {state})
  await waitForLoadingToFinish()

  expect(screen.getByText('No projects fetched, please refresh')).toBeInTheDocument()
})

it('should show a warning if no projects match the search', async () => {
  const feed = buildFeed({trayId: 'trayId'})
  const project = buildProject({
    projectId: 'projectId',
    description: 'foo'
  })
  const state = {
    [feedsRoot]: {
      trayId: feed
    },
    [selectedRoot]: {
      trayId: []
    }
  }
  jest.spyOn(Gateway, 'post').mockResolvedValue([project])

  const {user} = render(<AvailableProjects feed={feed}/>, {state})
  await waitForLoadingToFinish()

  await user.type(screen.getByLabelText('Search'), 'bar')
  expect(screen.getByText('No matching projects, please update your search')).toBeInTheDocument()
})
