import React from 'react'
import {noop} from 'lodash'
import {InterestingProjects} from '../../../src/client/monitor/InterestingProjects'
import {buildProject, buildProjectError, buildTray, render} from '../testHelpers'
import {Prognosis} from '../../../src/client/domain/Project'
import {TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'
import {SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'
import {setSystemTime} from '../clock'

const trayId = 'some-tray-id'

beforeAll(() => {
  // not implemented in jsdom, this stops errors being printed during tests
  // eslint-disable-next-line @typescript-eslint/unbound-method
  window.HTMLMediaElement.prototype.pause = noop
})

describe('broken build sfx', () => {

  it('should play if its enabled and any project is broken', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        playBrokenBuildSoundFx: true,
        brokenBuildSoundFx: 'some-sfx'
      }
    }
    const props = {
      projects: [
        buildProject({trayId, prognosis: Prognosis.sick})
      ],
      errors: []
    }
    const {getByTestId} = render(<InterestingProjects {...props}/>, state)
    expect(getByTestId('broken-build-sound')).toHaveAttribute('src', 'some-sfx')
  })

  it('should not play if its off even if any project is sick', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        playBrokenBuildSoundFx: false
      }
    }
    const props = {
      projects: [
        buildProject({trayId, prognosis: Prognosis.sick})
      ],
      errors: []
    }
    const {queryByTestId} = render(<InterestingProjects {...props}/>, state)
    expect(queryByTestId('broken-build-sound')).not.toBeInTheDocument()
  })

  it('should not play if its enabled but no projects are sick', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        playBrokenBuildSoundFx: true
      }
    }
    const props = {
      projects: [
        buildProject({trayId, prognosis: Prognosis.unknown})
      ],
      errors: []
    }
    const {queryByTestId} = render(<InterestingProjects {...props}/>, state)
    expect(queryByTestId('broken-build-sound')).not.toBeInTheDocument()
  })

  it('should not play if its enabled but a sound fx has not been set', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        playBrokenBuildSoundFx: true,
        brokenBuildFx: ''
      }
    }
    const props = {
      projects: [
        buildProject({trayId, prognosis: Prognosis.sick})
      ],
      errors: []
    }
    const {queryByTestId} = render(<InterestingProjects {...props}/>, state)
    expect(queryByTestId('broken-build-sound')).not.toBeInTheDocument()
  })
})

describe('displaying project information', () => {

  it.each([
    Prognosis.sick,
    Prognosis.healthy,
    Prognosis.unknown
  ])('should show the identifier, time and label for %s projects', (prognosis) => {
    setSystemTime('2020-01-25T20:23:00Z')
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId, name: 'some-tray-name'})
      },
      [SETTINGS_ROOT]: {
        showTrayName: true,
        showBuildTime: true,
        showBuildLabel: true
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId,
          name: 'some-project-name',
          prognosis,
          lastBuildLabel: '1234',
          lastBuildTime: '2020-01-25T19:23:00Z'
        })
      ],
      errors: []
    }

    const {queryByText} = render(<InterestingProjects {...props}/>, state)

    expect(queryByText('some-tray-name')).toBeInTheDocument()
    expect(queryByText('some-project-name')).toBeInTheDocument()
    expect(queryByText('#1234')).toBeInTheDocument()
    expect(queryByText('about 1 hour')).toBeInTheDocument()
  })

  it('should show the identifier, even when time and label is unavailable for unknown projects', () => {
    setSystemTime('2020-01-25T20:23:00Z')
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId, name: 'some-tray-name'})
      },
      [SETTINGS_ROOT]: {
        showTrayName: true,
        showBuildTime: true,
        showBuildLabel: true
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId,
          name: 'some-project-name',
          prognosis: Prognosis.unknown,
          lastBuildLabel: '',
          lastBuildTime: ''
        })
      ],
      errors: []
    }

    const {queryByText, queryByTestId} = render(<InterestingProjects {...props}/>, state)

    expect(queryByText('some-tray-name')).toBeInTheDocument()
    expect(queryByText('some-project-name')).toBeInTheDocument()
    expect(queryByTestId('build-label')).not.toBeInTheDocument()
    expect(queryByText('unknown')).toBeInTheDocument()
  })

  // labels can not be shown for building projects as they are not updated until after the project has finished building
  it('should show the identifier and time but not the label for building projects', () => {
    setSystemTime('2020-01-25T20:23:00Z')
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId, name: 'some-tray-name'})
      },
      [SETTINGS_ROOT]: {
        showTrayName: true,
        showBuildTime: true,
        showBuildLabel: true
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId,
          name: 'some-project-name',
          prognosis: Prognosis.sickBuilding,
          lastBuildLabel: '1234',
          lastBuildTime: '2020-01-25T19:23:00Z',
          thisBuildTime: '2020-01-25T20:53:00Z'
        })
      ],
      errors: []
    }

    const {queryByText} = render(<InterestingProjects {...props}/>, state)

    expect(queryByText('some-tray-name')).toBeInTheDocument()
    expect(queryByText('some-project-name')).toBeInTheDocument()
    expect(queryByText('#1234')).not.toBeInTheDocument()
    expect(queryByText('30 minutes')).toBeInTheDocument()
  })

  it('should just show the project name if all display settings are not on', () => {
    setSystemTime('2020-01-25T20:23:00Z')
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId, name: 'some-tray-name'})
      },
      [SETTINGS_ROOT]: {
        showTrayName: false,
        showBuildTime: false,
        showBuildLabel: false
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId,
          name: 'some-project-name',
          prognosis: Prognosis.sick,
          lastBuildLabel: '1234',
          lastBuildTime: '2020-01-25T19:23:00Z'
        })
      ],
      errors: []
    }

    const {queryByText} = render(<InterestingProjects {...props}/>, state)

    expect(queryByText('some-tray-name')).not.toBeInTheDocument()
    expect(queryByText('some-project-name')).toBeInTheDocument()
    expect(queryByText('#1234')).not.toBeInTheDocument()
    expect(queryByText('about 1 hour')).not.toBeInTheDocument()
  })

  it('should add an external link to the project on the CI server', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId,
          name: 'some-project-name',
          prognosis: Prognosis.sickBuilding,
          webUrl: 'some-url'
        })
      ],
      errors: []
    }

    const {queryByText} = render(<InterestingProjects {...props}/>, state)

    expect(queryByText('some-project-name')).toHaveAttribute('href', 'some-url')
  })
})

describe('limiting the projects displayed', () => {

  it('should not display a summary if the number of projects is less than the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: 6
      }
    }
    const props = {
      projects: [
        buildProject({trayId, prognosis: Prognosis.sick})
      ],
      errors: []
    }
    const {queryByText} = render(<InterestingProjects {...props}/>, state)
    expect(queryByText(/\+\d+ not shown/)).not.toBeInTheDocument()
  })

  it('should not display a summary if the number of projects is equal to the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: 6
      }
    }
    const props = {
      projects: [
        buildProject({projectId: '1', trayId}),
        buildProject({projectId: '2', trayId}),
        buildProject({projectId: '3', trayId}),
        buildProject({projectId: '4', trayId}),
        buildProject({projectId: '5', trayId}),
        buildProject({projectId: '6', trayId})
      ],
      errors: []
    }
    const {queryByText} = render(<InterestingProjects {...props}/>, state)
    expect(queryByText(/\+\d+ not shown/)).not.toBeInTheDocument()
  })

  it('should display a summary if the number of projects is more than the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: 6
      }
    }
    const props = {
      projects: [
        buildProject({projectId: '1', trayId}),
        buildProject({projectId: '2', trayId}),
        buildProject({projectId: '3', trayId}),
        buildProject({projectId: '4', trayId}),
        buildProject({projectId: '5', trayId}),
        buildProject({projectId: '6', trayId}),
        buildProject({projectId: '7', trayId}),
        buildProject({projectId: '8', trayId})
      ],
      errors: []
    }
    const {queryByText} = render(<InterestingProjects {...props}/>, state)
    expect(queryByText('+3 projects not shown')).toBeInTheDocument()
  })

  it('should display a summary if the number of errors is more than the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: 6
      }
    }
    const props = {
      projects: [],
      errors: [
        buildProjectError({trayId, errorMessage: 'error 1'}),
        buildProjectError({trayId, errorMessage: 'error 2'}),
        buildProjectError({trayId, errorMessage: 'error 3'}),
        buildProjectError({trayId, errorMessage: 'error 4'}),
        buildProjectError({trayId, errorMessage: 'error 5'}),
        buildProjectError({trayId, errorMessage: 'error 6'}),
        buildProjectError({trayId, errorMessage: 'error 7'})
      ]
    }
    const {queryByText} = render(<InterestingProjects {...props}/>, state)
    expect(queryByText('+2 projects not shown')).toBeInTheDocument()
  })

  it('should display a summary if the number of errors and projects is more than the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: 6
      }
    }
    const props = {
      projects: [
        buildProject({projectId: '1', trayId}),
        buildProject({projectId: '2', trayId}),
        buildProject({projectId: '3', trayId})
      ],
      errors: [
        buildProjectError({trayId, errorMessage: 'error 1'}),
        buildProjectError({trayId, errorMessage: 'error 2'}),
        buildProjectError({trayId, errorMessage: 'error 3'}),
        buildProjectError({trayId, errorMessage: 'error 4'})
      ]
    }
    const {queryByText} = render(<InterestingProjects {...props}/>, state)
    expect(queryByText('+2 projects not shown')).toBeInTheDocument()
  })
})
