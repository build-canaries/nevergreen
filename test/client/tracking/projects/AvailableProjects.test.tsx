import React from 'react'
import {noop} from 'lodash'
import userEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import {buildProject, buildProjectError, buildTray, render} from '../../testHelpers'
import {fakeRequest} from '../../../../src/client/gateways/Gateway'
import {AvailableProjects} from '../../../../src/client/tracking/projects/AvailableProjects'
import {TRAYS_ROOT} from '../../../../src/client/tracking/TraysReducer'
import {PROJECTS_ROOT} from '../../../../src/client/tracking/ProjectsReducer'
import {SELECTED_ROOT} from '../../../../src/client/tracking/SelectedReducer'
import * as ProjectsGateway from '../../../../src/client/gateways/ProjectsGateway'

const DEFAULT_PROPS = {
  index: 1,
  tray: buildTray(),
  requiresRefresh: false,
  setRequiresRefresh: noop
}

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

  const {container} = render(<AvailableProjects {...DEFAULT_PROPS} tray={tray}/>, state)
  const selectInput = container.querySelector('input[type="checkbox"]')

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

  const {queryByTestId, getByText, queryByText} = render(<AvailableProjects {...DEFAULT_PROPS} tray={tray}/>, state)
  userEvent.click(getByText('Refresh'))

  await waitFor(() => {
    expect(queryByText('some-error')).toBeInTheDocument()
  })

  userEvent.click(getByText('Refresh'))

  await waitFor(() => {
    expect(queryByTestId('some-error')).not.toBeInTheDocument()
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
  const {queryByText} = render(<AvailableProjects {...DEFAULT_PROPS} tray={tray}/>, state)
  expect(queryByText('No projects fetched, please refresh')).toBeInTheDocument()
})

it('should show a warning if no projects match the filter', () => {
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

  const {getByLabelText, queryByText} = render(<AvailableProjects {...DEFAULT_PROPS} tray={tray}/>, state)
  userEvent.type(getByLabelText('Search'), 'bar')

  expect(queryByText('No matching projects, please update your filter')).toBeInTheDocument()
})

it('should show an error if the search is invalid', () => {
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
  const {getByLabelText, queryByText} = render(<AvailableProjects {...DEFAULT_PROPS} tray={tray}/>, state)
  userEvent.type(getByLabelText('Search'), '?')
  expect(queryByText(/^Project search not applied/)).toBeInTheDocument()
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
    const {getByTestId} = render(<AvailableProjects {...DEFAULT_PROPS} tray={tray}/>, state)
    expect(getByTestId('available-projects-list')).toHaveAttribute('aria-live', 'polite')
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
    const {getByTestId} = render(<AvailableProjects {...DEFAULT_PROPS} tray={tray}/>, state)
    expect(getByTestId('available-projects-list')).toHaveAttribute('aria-relevant', 'additions')
  })
})
