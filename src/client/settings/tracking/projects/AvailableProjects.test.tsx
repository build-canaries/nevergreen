import React from 'react'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
import {buildProject, buildProjectError, buildTray, render} from '../../../testHelpers'
import {fakeRequest} from '../../../gateways/Gateway'
import {AvailableProjects} from './AvailableProjects'
import {TRAYS_ROOT} from '../TraysReducer'
import {PROJECTS_ROOT} from '../ProjectsReducer'
import {SELECTED_ROOT} from '../SelectedReducer'
import * as ProjectsGateway from '../../../gateways/ProjectsGateway'
import {REFRESH_HASH} from '../../../Routes'

beforeEach(() => {
  jest.spyOn(ProjectsGateway, 'fetchAll').mockResolvedValue(fakeRequest([]))
})

it('should be able to select projects', () => {
  const tray = buildTray({trayId: 'trayId'})
  const project = buildProject({trayId: 'trayId', projectId: 'projectId', description: 'some project'})
  const state = {
    [TRAYS_ROOT]: {
      trayId: tray
    },
    [PROJECTS_ROOT]: {
      trayId: [project]
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }

  render(<AvailableProjects tray={tray}/>, {state})
  const selectInput = screen.getByLabelText(/some project/)

  expect(selectInput).not.toBeChecked()

  userEvent.click(selectInput as Element)
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
  const tray = buildTray({trayId: 'trayId'})
  const state = {
    [TRAYS_ROOT]: {
      trayId: tray
    },
    [PROJECTS_ROOT]: {
      trayId: []
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }

  render(<AvailableProjects tray={tray}/>, {state})
  userEvent.click(screen.getByRole('button', {name: 'Refresh'}))

  await waitFor(() => {
    expect(screen.getByText('some-error')).toBeInTheDocument()
  })

  userEvent.click(screen.getByRole('button', {name: 'Refresh'}))

  await waitFor(() => {
    expect(screen.queryByText('some-error')).not.toBeInTheDocument()
  })
})

it('should show a warning if there are no projects', () => {
  const tray = buildTray({trayId: 'trayId'})
  const state = {
    [TRAYS_ROOT]: {
      trayId: tray
    },
    [PROJECTS_ROOT]: {
      trayId: []
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }
  render(<AvailableProjects tray={tray}/>, {state})
  expect(screen.getByText('No projects fetched, please refresh')).toBeInTheDocument()
})

it('should show a warning if no projects match the search', () => {
  const tray = buildTray({trayId: 'trayId'})
  const state = {
    [TRAYS_ROOT]: {
      trayId: tray
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

  render(<AvailableProjects tray={tray}/>, {state})
  userEvent.type(screen.getByLabelText('Search'), 'bar')

  expect(screen.getByText('No matching projects, please update your search')).toBeInTheDocument()
})

it('should refresh automatically if the url contains #refresh', () => {
  jest.spyOn(ProjectsGateway, 'fetchAll').mockResolvedValue(fakeRequest([]))
  const tray = buildTray({trayId: 'trayId'})
  const project = buildProject({trayId: 'trayId', projectId: 'projectId', description: 'some project'})
  const state = {
    [TRAYS_ROOT]: {
      trayId: tray
    },
    [PROJECTS_ROOT]: {
      trayId: [project]
    },
    [SELECTED_ROOT]: {
      trayId: []
    }
  }

  render(<AvailableProjects tray={tray}/>, {state, currentLocation: `/${REFRESH_HASH}`})

  expect(ProjectsGateway.fetchAll).toHaveBeenCalled()
})

describe('accessibility', () => {

  it('should announce projects if a user refreshes', () => {
    const tray = buildTray({trayId: 'trayId'})
    const state = {
      [TRAYS_ROOT]: {
        trayId: tray
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
    render(<AvailableProjects tray={tray}/>, {state})
    expect(screen.getByTestId('available-projects-list')).toHaveAttribute('aria-live', 'polite')
  })

  // This is because we first mark removed projects by disabling the checkbox and adding a removed label.
  // The user would need to refresh again to actually remove the project checkbox from the DOM, at which
  // point they should already know the project has been removed and thus it doesn't need to be announced
  it('should only announce project additions', () => {
    const tray = buildTray({trayId: 'trayId'})
    const state = {
      [TRAYS_ROOT]: {
        trayId: tray
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
    render(<AvailableProjects tray={tray}/>, {state})
    expect(screen.getByTestId('available-projects-list')).toHaveAttribute('aria-relevant', 'additions')
  })
})
