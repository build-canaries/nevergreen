import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import {buildFeed, buildProject, buildProjectError, render} from '../../../testHelpers'
import {fakeRequest} from '../../../gateways/Gateway'
import {AvailableProjects} from './AvailableProjects'
import {FEEDS_ROOT} from '../FeedsReducer'
import {PROJECTS_ROOT} from '../ProjectsReducer'
import {SELECTED_ROOT} from '../SelectedReducer'
import * as ProjectsGateway from '../../../gateways/ProjectsGateway'

beforeEach(() => {
  jest.spyOn(ProjectsGateway, 'fetchAll').mockResolvedValue(fakeRequest([]))
})

it('should be able to select projects', async () => {
  const feed = buildFeed({trayId: 'trayId'})
  const project = buildProject({trayId: 'trayId', projectId: 'projectId', description: 'some project'})
  const state = {
    [FEEDS_ROOT]: {
      trayId: feed
    },
    [PROJECTS_ROOT]: {
      trayId: [project]
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }

  const {user} = render(<AvailableProjects feed={feed}/>, {state})
  const selectInput = screen.getByLabelText(/some project/)

  expect(selectInput).not.toBeChecked()

  await user.click(selectInput as Element)
  expect(selectInput).toBeChecked()
})

it('should correctly show and remove errors returned while refreshing', async () => {
  jest.spyOn(ProjectsGateway, 'fetchAll')
    .mockResolvedValueOnce(fakeRequest([
      buildProjectError({description: 'some-error'})
    ]))
    .mockResolvedValueOnce(fakeRequest([
      buildProject()
    ]))
  const feed = buildFeed({trayId: 'trayId'})
  const state = {
    [FEEDS_ROOT]: {
      trayId: feed
    },
    [PROJECTS_ROOT]: {
      trayId: []
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }

  const {user} = render(<AvailableProjects feed={feed}/>, {state})
  await user.click(screen.getByRole('button', {name: 'Refresh'}))

  await waitFor(() => {
    expect(screen.getByText('some-error')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', {name: 'Refresh'}))

  await waitFor(() => {
    expect(screen.queryByText('some-error')).not.toBeInTheDocument()
  })
})

it('should show a warning if there are no projects', () => {
  const feed = buildFeed({trayId: 'trayId'})
  const state = {
    [FEEDS_ROOT]: {
      trayId: feed
    },
    [PROJECTS_ROOT]: {
      trayId: []
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }
  render(<AvailableProjects feed={feed}/>, {state})
  expect(screen.getByText('No projects fetched, please refresh')).toBeInTheDocument()
})

it('should show a warning if no projects match the search', async () => {
  const feed = buildFeed({trayId: 'trayId'})
  const state = {
    [FEEDS_ROOT]: {
      trayId: feed
    },
    [PROJECTS_ROOT]: {
      trayId: [
        buildProject({
          projectId: 'projectId',
          description: 'foo'
        })
      ]
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }

  const {user} = render(<AvailableProjects feed={feed}/>, {state})
  await user.type(screen.getByLabelText('Search'), 'bar')

  expect(screen.getByText('No matching projects, please update your search')).toBeInTheDocument()
})

it('should refresh automatically if the url contains #refresh', () => {
  jest.spyOn(ProjectsGateway, 'fetchAll').mockResolvedValue(fakeRequest([]))
  const feed = buildFeed({trayId: 'trayId'})
  const project = buildProject({trayId: 'trayId', projectId: 'projectId', description: 'some project'})
  const state = {
    [FEEDS_ROOT]: {
      trayId: feed
    },
    [PROJECTS_ROOT]: {
      trayId: [project]
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }

  render(<AvailableProjects feed={feed}/>, {state, currentLocation: '/#refresh'})

  expect(ProjectsGateway.fetchAll).toHaveBeenCalled()
})

describe('accessibility', () => {

  it('should announce projects if a user refreshes', () => {
    const feed = buildFeed({trayId: 'trayId'})
    const state = {
      [FEEDS_ROOT]: {
        trayId: feed
      },
      [PROJECTS_ROOT]: {
        trayId: [
          buildProject({
            projectId: 'projectId'
          })
        ]
      },
      [SELECTED_ROOT]: {
        trayId: []
      }
    }
    render(<AvailableProjects feed={feed}/>, {state})
    expect(screen.getByTestId('available-projects-list')).toHaveAttribute('aria-live', 'polite')
  })

  // This is because we first mark removed projects by disabling the checkbox and adding a removed label.
  // The user would need to refresh again to actually remove the project checkbox from the DOM, at which
  // point they should already know the project has been removed and thus it doesn't need to be announced
  it('should only announce project additions', () => {
    const feed = buildFeed({trayId: 'trayId'})
    const state = {
      [FEEDS_ROOT]: {
        trayId: feed
      },
      [PROJECTS_ROOT]: {
        trayId: [
          buildProject({
            projectId: 'projectId'
          })
        ]
      },
      [SELECTED_ROOT]: {
        trayId: []
      }
    }
    render(<AvailableProjects feed={feed}/>, {state})
    expect(screen.getByTestId('available-projects-list')).toHaveAttribute('aria-relevant', 'additions')
  })
})
