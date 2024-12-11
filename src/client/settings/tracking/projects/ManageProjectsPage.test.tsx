import {
  render,
  waitForLoadingToFinish,
  waitForLocationToChange,
} from '../../../testUtils/testHelpers'
import {
  buildFeed,
  buildFeedError,
  buildProject,
} from '../../../testUtils/builders'
import { screen, waitFor } from '@testing-library/react'
import { ManageProjectsPage } from './ManageProjectsPage'
import { feedsRoot, getFeed, TrackingMode } from '../FeedsReducer'
import { getSelectedProjectsForFeed, selectedRoot } from '../SelectedReducer'
import * as Gateway from '../../../gateways/Gateway'

const trayId = 'trayId'

it('should allow the tracking mode to be changed', async () => {
  const feed = buildFeed({ trayId, trackingMode: TrackingMode.selected })
  const state = {
    [feedsRoot]: {
      [trayId]: feed,
    },
  }
  const { user, store } = render(<ManageProjectsPage />, {
    state,
    outletContext: feed,
  })

  await user.selectOptions(
    screen.getByLabelText('Tracking mode'),
    TrackingMode.everything,
  )
  await user.click(screen.getByRole('button', { name: 'Save changes' }))

  await waitForLocationToChange()

  expect(getFeed(trayId)(store.getState())).toEqual(
    expect.objectContaining({
      trackingMode: TrackingMode.everything,
    }),
  )
  expect(window.location.pathname).toEqual('/settings/tracking')
})

it('should be able to select and unselect projects', async () => {
  const feed = buildFeed({ trayId, trackingMode: TrackingMode.selected })
  const project = buildProject({
    trayId,
    projectId: 'projectId',
    description: 'some project',
  })
  const state = {
    [feedsRoot]: {
      [trayId]: feed,
    },
    [selectedRoot]: {
      [trayId]: [],
    },
  }
  jest.spyOn(Gateway, 'post').mockResolvedValueOnce([project])

  const { user, store } = render(<ManageProjectsPage />, {
    state,
    outletContext: feed,
  })

  await waitForLoadingToFinish()

  expect(screen.getByLabelText(/some project/)).not.toBeChecked()

  await user.click(screen.getByLabelText(/some project/))

  expect(screen.getByLabelText(/some project/)).toBeChecked()

  await user.click(screen.getByRole('button', { name: 'Save changes' }))

  await waitForLocationToChange()

  expect(getSelectedProjectsForFeed(trayId)(store.getState())).toEqual([
    'projectId',
  ])
})

it('should be able to include and exclude all projects', async () => {
  const feed = buildFeed({ trayId, trackingMode: TrackingMode.selected })
  const project1 = buildProject({ trayId, projectId: '1', description: '1' })
  const project2 = buildProject({ trayId, projectId: '2', description: '2' })
  const state = {
    [feedsRoot]: {
      [trayId]: feed,
    },
    [selectedRoot]: {
      [trayId]: [],
    },
  }
  jest.spyOn(Gateway, 'post').mockResolvedValueOnce([project1, project2])

  const { user } = render(<ManageProjectsPage />, {
    state,
    outletContext: feed,
  })

  await waitForLoadingToFinish()

  expect(screen.getByLabelText(/1/)).not.toBeChecked()
  expect(screen.getByLabelText(/2/)).not.toBeChecked()

  await user.click(screen.getByRole('button', { name: 'Include all' }))

  expect(screen.getByLabelText(/1/)).toBeChecked()
  expect(screen.getByLabelText(/2/)).toBeChecked()

  await user.click(screen.getByRole('button', { name: 'Exclude all' }))

  expect(screen.getByLabelText(/1/)).not.toBeChecked()
  expect(screen.getByLabelText(/2/)).not.toBeChecked()
})

it('should correctly show and remove errors returned while refreshing', async () => {
  jest
    .spyOn(Gateway, 'post')
    .mockResolvedValueOnce([buildFeedError({ description: 'some-error' })])
    .mockResolvedValueOnce([buildProject()])
  const feed = buildFeed({ trayId, trackingMode: TrackingMode.selected })
  const state = {
    [feedsRoot]: {
      [trayId]: feed,
    },
    [selectedRoot]: {
      [trayId]: [],
    },
  }

  const { user } = render(<ManageProjectsPage />, {
    state,
    outletContext: feed,
  })

  await waitFor(() => {
    expect(screen.getByText('some-error')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', { name: 'Refresh' }))

  await waitFor(() => {
    expect(screen.queryByText('some-error')).not.toBeInTheDocument()
  })
})

it('should show a warning if there are no projects', async () => {
  const feed = buildFeed({ trayId, trackingMode: TrackingMode.selected })
  const state = {
    [feedsRoot]: {
      [trayId]: feed,
    },
    [selectedRoot]: {
      [trayId]: [],
    },
  }
  jest.spyOn(Gateway, 'post').mockResolvedValue([])

  render(<ManageProjectsPage />, { state, outletContext: feed })

  await waitForLoadingToFinish()

  expect(
    screen.getByText('No projects fetched, please refresh'),
  ).toBeInTheDocument()
})

it('should show a warning if no projects match the search', async () => {
  const feed = buildFeed({ trayId, trackingMode: TrackingMode.selected })
  const project = buildProject({
    projectId: 'projectId',
    description: 'foo',
  })
  const state = {
    [feedsRoot]: {
      [trayId]: feed,
    },
    [selectedRoot]: {
      [trayId]: [],
    },
  }
  jest.spyOn(Gateway, 'post').mockResolvedValue([project])

  const { user } = render(<ManageProjectsPage />, {
    state,
    outletContext: feed,
  })

  await waitForLoadingToFinish()

  await user.type(screen.getByLabelText('Search'), 'bar')
  expect(
    screen.getByText('No matching projects, please update your search'),
  ).toBeInTheDocument()
})
