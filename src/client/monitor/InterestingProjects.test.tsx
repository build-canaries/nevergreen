import React from 'react'
import {InterestingProjects} from './InterestingProjects'
import {buildProject, buildProjectError, buildTray, render, setSystemTime} from '../testHelpers'
import {Prognosis, ProjectPrognosis} from '../domain/Project'
import {TRAYS_ROOT} from '../settings/tracking/TraysReducer'
import {MaxProjectsToShow, SETTINGS_ROOT} from '../settings/SettingsReducer'
import {screen} from '@testing-library/react'

const trayId = 'some-tray-id'

describe('displaying project information', () => {

  it.each<ProjectPrognosis>([
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
          description: 'some-project-name',
          prognosis,
          lastBuildLabel: '1234',
          timestamp: '2020-01-25T19:23:00Z'
        })
      ]
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.getByText('some-tray-name')).toBeInTheDocument()
    expect(screen.getByText('some-project-name')).toBeInTheDocument()
    expect(screen.getByText('#1234')).toBeInTheDocument()
    expect(screen.getByText('about 1 hour')).toBeInTheDocument()
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
          description: 'some-project-name',
          prognosis: Prognosis.unknown,
          lastBuildLabel: '',
          timestamp: ''
        })
      ]
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.getByText('some-tray-name')).toBeInTheDocument()
    expect(screen.getByText('some-project-name')).toBeInTheDocument()
    expect(screen.queryByTestId('build-label')).not.toBeInTheDocument()
    expect(screen.getByText('unknown')).toBeInTheDocument()
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
          description: 'some-project-name',
          prognosis: Prognosis.sickBuilding,
          lastBuildLabel: '1234',
          timestamp: '2020-01-25T19:53:00Z'
        })
      ]
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.getByText('some-tray-name')).toBeInTheDocument()
    expect(screen.getByText('some-project-name')).toBeInTheDocument()
    expect(screen.queryByText('#1234')).not.toBeInTheDocument()
    expect(screen.getByText('30 minutes')).toBeInTheDocument()
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
          description: 'some-project-name',
          prognosis: Prognosis.sick,
          lastBuildLabel: '1234',
          timestamp: '2020-01-25T19:23:00Z'
        })
      ]
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.queryByText('some-tray-name')).not.toBeInTheDocument()
    expect(screen.getByText('some-project-name')).toBeInTheDocument()
    expect(screen.queryByText('#1234')).not.toBeInTheDocument()
    expect(screen.queryByText('about 1 hour')).not.toBeInTheDocument()
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
          description: 'some-project-name',
          prognosis: Prognosis.sickBuilding,
          webUrl: 'some-url'
        })
      ]
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.queryByText('some-project-name')).toHaveAttribute('href', 'some-url')
  })
})

describe('limiting the projects displayed', () => {

  it('should not display a summary if the number of projects is less than the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [
        buildProject({trayId, prognosis: Prognosis.sick})
      ]
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.queryByText(/\+\d+ not shown/)).not.toBeInTheDocument()
  })

  it('should not display a summary if the number of projects is equal to the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [
        buildProject({projectId: '1', trayId}),
        buildProject({projectId: '2', trayId}),
        buildProject({projectId: '3', trayId}),
        buildProject({projectId: '4', trayId}),
        buildProject({projectId: '5', trayId})
      ]
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.queryByText(/\+\d+ not shown/)).not.toBeInTheDocument()
  })

  it('should display a summary if the number of projects is more than the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: MaxProjectsToShow.small
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
      ]
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.getByText('+3 not shown')).toBeInTheDocument()
  })

  it('should display a summary if the number of errors is more than the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [
        buildProjectError({trayId, description: 'error 1'}),
        buildProjectError({trayId, description: 'error 2'}),
        buildProjectError({trayId, description: 'error 3'}),
        buildProjectError({trayId, description: 'error 4'}),
        buildProjectError({trayId, description: 'error 5'}),
        buildProjectError({trayId, description: 'error 6'}),
        buildProjectError({trayId, description: 'error 7'})
      ]
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.getByText('+2 not shown')).toBeInTheDocument()
    expect(screen.getByText('+2 error')).toBeInTheDocument()
  })

  it('should display a summary if the number of errors and projects is more than the max', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SETTINGS_ROOT]: {
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [
        buildProjectError({trayId, description: 'error 1'}),
        buildProjectError({trayId, description: 'error 2'}),
        buildProjectError({trayId, description: 'error 3'}),
        buildProjectError({trayId, description: 'error 4'}),
        buildProject({projectId: '1', trayId}),
        buildProject({projectId: '2', trayId, prognosis: Prognosis.sick}),
        buildProject({projectId: '3', trayId, prognosis: Prognosis.healthyBuilding})
      ]
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.getByText('+2 not shown')).toBeInTheDocument()
    expect(screen.getByText('+1 sick, +1 healthy building')).toBeInTheDocument()
  })
})
