import React from 'react'
import {InterestingProjects} from './InterestingProjects'
import {render, setSystemTime} from '../testUtils/testHelpers'
import {buildFeed, buildFeedError, buildProject} from '../testUtils/builders'
import {Prognosis, ProjectPrognosis} from '../domain/Project'
import {feedsRoot} from '../settings/tracking/FeedsReducer'
import {MaxProjectsToShow, settingsRoot} from '../settings/SettingsReducer'
import {screen} from '@testing-library/react'

const feedId = 'some-tray-id'

describe('displaying project information', () => {

  it.each<ProjectPrognosis>([
    Prognosis.sick,
    Prognosis.healthy,
    Prognosis.unknown
  ])('should show the identifier, time and label for %s projects', (prognosis) => {
    setSystemTime('2020-01-25T20:23:00Z')
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId, name: 'some-feed-name'})
      },
      [settingsRoot]: {
        showPrognosis: [prognosis],
        showTrayName: true,
        showBuildTime: true,
        showBuildLabel: true
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId: feedId,
          description: 'some-project-name',
          prognosis,
          lastBuildLabel: '1234',
          timestamp: '2020-01-25T19:23:00Z'
        })
      ],
      feedErrors: []
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.getByText('some-feed-name')).toBeInTheDocument()
    expect(screen.getByText('some-project-name')).toBeInTheDocument()
    expect(screen.getByText('#1234')).toBeInTheDocument()
    expect(screen.getByText('about 1 hour')).toBeInTheDocument()
  })

  it('should show the identifier, even when time and label is unavailable for unknown projects', () => {
    setSystemTime('2020-01-25T20:23:00Z')
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId, name: 'some-feed-name'})
      },
      [settingsRoot]: {
        showPrognosis: [Prognosis.unknown],
        showTrayName: true,
        showBuildTime: true,
        showBuildLabel: true
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId: feedId,
          description: 'some-project-name',
          prognosis: Prognosis.unknown,
          lastBuildLabel: '',
          timestamp: ''
        })
      ],
      feedErrors: []
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.getByText('some-feed-name')).toBeInTheDocument()
    expect(screen.getByText('some-project-name')).toBeInTheDocument()
    expect(screen.queryByTestId('build-label')).not.toBeInTheDocument()
    expect(screen.getByText('unknown')).toBeInTheDocument()
  })

  // labels can not be shown for building projects as they are not updated until after the project has finished building
  it('should show the identifier and time but not the label for building projects', () => {
    setSystemTime('2020-01-25T20:23:00Z')
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId, name: 'some-feed-name'})
      },
      [settingsRoot]: {
        showPrognosis: [Prognosis.sickBuilding],
        showTrayName: true,
        showBuildTime: true,
        showBuildLabel: true
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId: feedId,
          description: 'some-project-name',
          prognosis: Prognosis.sickBuilding,
          lastBuildLabel: '1234',
          timestamp: '2020-01-25T19:53:00Z'
        })
      ],
      feedErrors: []
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.getByText('some-feed-name')).toBeInTheDocument()
    expect(screen.getByText('some-project-name')).toBeInTheDocument()
    expect(screen.queryByText('#1234')).not.toBeInTheDocument()
    expect(screen.getByText('30 minutes')).toBeInTheDocument()
  })

  it('should just show the project name if all display settings are not on', () => {
    setSystemTime('2020-01-25T20:23:00Z')
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId, name: 'some-feed-name'})
      },
      [settingsRoot]: {
        showPrognosis: [Prognosis.sick],
        showTrayName: false,
        showBuildTime: false,
        showBuildLabel: false
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId: feedId,
          description: 'some-project-name',
          prognosis: Prognosis.sick,
          lastBuildLabel: '1234',
          timestamp: '2020-01-25T19:23:00Z'
        })
      ],
      feedErrors: []
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.queryByText('some-feed-name')).not.toBeInTheDocument()
    expect(screen.getByText('some-project-name')).toBeInTheDocument()
    expect(screen.queryByText('#1234')).not.toBeInTheDocument()
    expect(screen.queryByText('about 1 hour')).not.toBeInTheDocument()
  })

  it('should add an external link to the project on the CI server', () => {
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId})
      },
      [settingsRoot]: {
        showPrognosis: [Prognosis.sickBuilding],
      }
    }
    const props = {
      projects: [
        buildProject({
          trayId: feedId,
          description: 'some-project-name',
          prognosis: Prognosis.sickBuilding,
          webUrl: 'some-url'
        })
      ],
      feedErrors: []
    }

    render(<InterestingProjects {...props}/>, {state})

    expect(screen.queryByText('some-project-name')).toHaveAttribute('href', 'some-url')
  })
})

describe('limiting the projects displayed', () => {

  it('should not display a summary if the number of projects is less than the max', () => {
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId})
      },
      [settingsRoot]: {
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [
        buildProject({trayId: feedId, prognosis: Prognosis.sick})
      ],
      feedErrors: []
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.queryByText(/\+\d+ not shown/)).not.toBeInTheDocument()
  })

  it('should not display a summary if the number of projects is equal to the max', () => {
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId})
      },
      [settingsRoot]: {
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [
        buildProject({projectId: '1', trayId: feedId}),
        buildProject({projectId: '2', trayId: feedId}),
        buildProject({projectId: '3', trayId: feedId}),
        buildProject({projectId: '4', trayId: feedId}),
        buildProject({projectId: '5', trayId: feedId})
      ],
      feedErrors: []
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.queryByText(/\+\d+ not shown/)).not.toBeInTheDocument()
  })

  it('should display a summary if the number of projects is more than the max', () => {
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId})
      },
      [settingsRoot]: {
        showPrognosis: [Prognosis.sick, Prognosis.sickBuilding, Prognosis.healthy, Prognosis.healthyBuilding, Prognosis.unknown],
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [
        buildProject({projectId: '1', trayId: feedId}),
        buildProject({projectId: '2', trayId: feedId}),
        buildProject({projectId: '3', trayId: feedId}),
        buildProject({projectId: '4', trayId: feedId}),
        buildProject({projectId: '5', trayId: feedId}),
        buildProject({projectId: '6', trayId: feedId}),
        buildProject({projectId: '7', trayId: feedId}),
        buildProject({projectId: '8', trayId: feedId})
      ],
      feedErrors: []
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.getByText('+3 not shown')).toBeInTheDocument()
  })

  it('should display a summary if the number of errors is more than the max', () => {
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId})
      },
      [settingsRoot]: {
        showPrognosis: [Prognosis.error],
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [],
      feedErrors: [
        buildFeedError({trayId: feedId, description: 'error 1'}),
        buildFeedError({trayId: feedId, description: 'error 2'}),
        buildFeedError({trayId: feedId, description: 'error 3'}),
        buildFeedError({trayId: feedId, description: 'error 4'}),
        buildFeedError({trayId: feedId, description: 'error 5'}),
        buildFeedError({trayId: feedId, description: 'error 6'}),
        buildFeedError({trayId: feedId, description: 'error 7'})
      ]
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.getByText('+2 not shown')).toBeInTheDocument()
    expect(screen.getByText('+2 error')).toBeInTheDocument()
  })

  it('should display a summary if the number of errors and projects is more than the max', () => {
    const state = {
      [feedsRoot]: {
        [feedId]: buildFeed({trayId: feedId})
      },
      [settingsRoot]: {
        showPrognosis: [
          Prognosis.sick,
          Prognosis.sickBuilding,
          Prognosis.healthy,
          Prognosis.healthyBuilding,
          Prognosis.unknown,
          Prognosis.error
        ],
        maxProjectsToShow: MaxProjectsToShow.small
      }
    }
    const props = {
      projects: [
        buildProject({projectId: '1', trayId: feedId}),
        buildProject({projectId: '2', trayId: feedId, prognosis: Prognosis.sick}),
        buildProject({projectId: '3', trayId: feedId, prognosis: Prognosis.healthyBuilding})
      ],
      feedErrors: [
        buildFeedError({trayId: feedId, description: 'error 1'}),
        buildFeedError({trayId: feedId, description: 'error 2'}),
        buildFeedError({trayId: feedId, description: 'error 3'}),
        buildFeedError({trayId: feedId, description: 'error 4'})
      ]
    }
    render(<InterestingProjects {...props}/>, {state})
    expect(screen.getByText('+2 not shown')).toBeInTheDocument()
    expect(screen.getByText('+1 sick, +1 healthy building')).toBeInTheDocument()
  })
})

it('should filter projects based on prognosis', () => {
  const state = {
    [feedsRoot]: {
      [feedId]: buildFeed({trayId: feedId, name: 'some-feed-name'})
    },
    [settingsRoot]: {
      showPrognosis: [Prognosis.sick],
      showBuildTime: true,
      showBuildLabel: true
    }
  }
  const props = {
    projects: [
      buildProject({
        trayId: feedId,
        description: 'some-project-name',
        prognosis: Prognosis.healthy,
      }),
      buildProject({
        trayId: feedId,
        description: 'another-project-name',
        prognosis: Prognosis.sick,
      })
    ],
    feedErrors: []
  }

  render(<InterestingProjects {...props}/>, {state})

  expect(screen.getByText('another-project-name')).toBeInTheDocument()
  expect(screen.queryByText('some-project-name')).not.toBeInTheDocument()
})
