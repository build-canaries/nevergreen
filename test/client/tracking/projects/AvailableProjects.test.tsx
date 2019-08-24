import React from 'react'
import {AvailableProjects} from '../../../../src/client/tracking/projects/AvailableProjects'
import {render} from '../../testHelpers'
import {TRAYS_ROOT} from '../../../../src/client/tracking/TraysReducer'
import {PROJECTS_ROOT} from '../../../../src/client/tracking/ProjectsReducer'
import userEvent from '@testing-library/user-event'
import {SELECTED_ROOT} from '../../../../src/client/tracking/SelectedReducer'

describe('<AvailableProjects/>', () => {

  const DEFAULT_PROPS = {
    trayId: 'trayId',
    index: 1
  }

  it('should show tray errors', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: {
          errors: ['some-error']
        }
      }
    }
    const {queryByText} = render(<AvailableProjects {...DEFAULT_PROPS} />, state)
    expect(queryByText('some-error')).toBeInTheDocument()
  })

  it('should show a warning if there are no projects', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: {}
      },
      [PROJECTS_ROOT]: {
        trayId: {}
      },
      [SELECTED_ROOT]: {
        trayId: []
      }
    }
    const {queryByText} = render(<AvailableProjects {...DEFAULT_PROPS} />, state)
    expect(queryByText('No projects fetched, please refresh')).toBeInTheDocument()
  })

  it('should show a warning if no projects match the filter', async () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: {}
      },
      [PROJECTS_ROOT]: {
        trayId: {
          projectId: {
            projectId: 'projectId',
            name: 'foo'
          }
        }
      },
      [SELECTED_ROOT]: {
        trayId: []
      }
    }
    const {getByLabelText, queryByText} = render(<AvailableProjects {...DEFAULT_PROPS} />, state)
    await userEvent.type(getByLabelText('filter'), 'bar')
    expect(queryByText('No matching projects, please update your filter')).toBeInTheDocument()
  })

  it('should show an error if the filter is invalid', async () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: {}
      },
      [PROJECTS_ROOT]: {
        trayId: {
          projectId: {
            projectId: 'projectId'
          }
        }
      },
      [SELECTED_ROOT]: {
        trayId: []
      }
    }
    const {getByLabelText, queryByText} = render(<AvailableProjects {...DEFAULT_PROPS} />, state)
    await userEvent.type(getByLabelText('filter'), '?')
    expect(queryByText(/^Project filter not applied/)).toBeInTheDocument()
  })

  describe('accessibility', () => {

    it('should announce projects if a user refreshes', () => {
      const state = {
        [TRAYS_ROOT]: {
          trayId: {}
        },
        [PROJECTS_ROOT]: {
          trayId: {
            projectId: {
              projectId: 'projectId'
            }
          }
        },
        [SELECTED_ROOT]: {
          trayId: []
        }
      }
      const {getByTestId} = render(<AvailableProjects {...DEFAULT_PROPS} />, state)
      expect(getByTestId('available-projects-list')).toHaveAttribute('aria-live', 'polite')
    })

    // This is because we first mark removed projects by disabling the checkbox and adding a removed label.
    // The user would need to refresh again to actually remove the project checkbox from the DOM, at which
    // point they should already know the project has been removed and thus it doesn't need to be announced
    it('should only announce project additions', () => {
      const state = {
        [TRAYS_ROOT]: {
          trayId: {}
        },
        [PROJECTS_ROOT]: {
          trayId: {
            projectId: {
              projectId: 'projectId'
            }
          }
        },
        [SELECTED_ROOT]: {
          trayId: []
        }
      }
      const {getByTestId} = render(<AvailableProjects {...DEFAULT_PROPS} />, state)
      expect(getByTestId('available-projects-list')).toHaveAttribute('aria-relevant', 'additions')
    })
  })
})
