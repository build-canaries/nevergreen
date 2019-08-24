import React from 'react'
import {noop} from 'lodash'
import {InterestingProjects} from '../../../src/client/monitor/InterestingProjects'
import {buildProject, buildTray, render} from '../testHelpers'
import {Prognosis} from '../../../src/client/domain/Project'
import {TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'
import {SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'
import {INTERESTING_ROOT} from '../../../src/client/monitor/InterestingReducer'

describe('<InterestingProjects/>', () => {

  const trayId = 'some-tray-id'

  beforeAll(() => {
    // not implemented in jsdom, this stops errors being printed during tests
    HTMLMediaElement.prototype.pause = noop
  })

  describe('broken build sfx', () => {

    test('should play if its enabled and any project is broken', () => {
      const state = {
        [INTERESTING_ROOT]: {
          projects: [
            buildProject({trayId, prognosis: Prognosis.sick})
          ]
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          playBrokenBuildSoundFx: true,
          brokenBuildSoundFx: 'some-sfx'
        }
      }
      const {getByTestId} = render(<InterestingProjects/>, state)
      expect(getByTestId('broken-build-sound')).toHaveAttribute('src', 'some-sfx')
    })

    test('should not play if its disabled even if any project is sick', () => {
      const state = {
        [INTERESTING_ROOT]: {
          projects: [
            buildProject({trayId, prognosis: Prognosis.sick})
          ]
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          playBrokenBuildSoundFx: false
        }
      }
      const {queryByTestId} = render(<InterestingProjects/>, state)
      expect(queryByTestId('broken-build-sound')).not.toBeInTheDocument()
    })

    test('should not play if its enabled but no projects are sick', () => {
      const state = {
        [INTERESTING_ROOT]: {
          projects: [
            buildProject({trayId, prognosis: Prognosis.unknown})
          ]
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          playBrokenBuildSoundFx: true
        }
      }
      const {queryByTestId} = render(<InterestingProjects/>, state)
      expect(queryByTestId('broken-build-sound')).not.toBeInTheDocument()
    })

    test('should not play if its enabled but a sound fx has not been set', () => {
      const state = {
        [INTERESTING_ROOT]: {
          projects: [
            buildProject({trayId, prognosis: Prognosis.sick})
          ]
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          playBrokenBuildSoundFx: true,
          brokenBuildFx: ''
        }
      }
      const {queryByTestId} = render(<InterestingProjects/>, state)
      expect(queryByTestId('broken-build-sound')).not.toBeInTheDocument()
    })
  })

  describe('limiting the projects displayed', () => {

    test('should not display a summary if the number of projects is less than the max', () => {
      const state = {
        [INTERESTING_ROOT]: {
          projects: [
            buildProject({trayId, prognosis: Prognosis.sick})
          ]
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          maxProjectsToShow: 6
        }
      }
      const {queryByText} = render(<InterestingProjects/>, state)
      expect(queryByText(/\+\d+ additional projects/)).not.toBeInTheDocument()
    })

    test('should not display a summary if the number of projects is equal to the max', () => {
      const state = {
        [INTERESTING_ROOT]: {
          projects: [
            buildProject({projectId: '1', trayId}),
            buildProject({projectId: '2', trayId}),
            buildProject({projectId: '3', trayId}),
            buildProject({projectId: '4', trayId}),
            buildProject({projectId: '5', trayId}),
            buildProject({projectId: '6', trayId})
          ]
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          maxProjectsToShow: 6
        }
      }
      const {queryByText} = render(<InterestingProjects/>, state)
      expect(queryByText(/\+\d+ additional projects/)).not.toBeInTheDocument()
    })

    test('should display a summary if the number of projects is more than the max', () => {
      const state = {
        [INTERESTING_ROOT]: {
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
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          maxProjectsToShow: 6
        }
      }
      const {queryByText} = render(<InterestingProjects/>, state)
      expect(queryByText('+3 additional projects')).toBeInTheDocument()
    })

    test('should display a summary if the number of errors is more than the max', () => {
      const state = {
        [INTERESTING_ROOT]: {
          projects: [],
          errors: ['1', '2', '3', '4', '5', '6', '7']
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          maxProjectsToShow: 6
        }
      }
      const {queryByText} = render(<InterestingProjects/>, state)
      expect(queryByText('+2 additional projects')).toBeInTheDocument()
    })

    test('should display a summary if the number of errors and projects is more than the max', () => {
      const state = {
        [INTERESTING_ROOT]: {
          projects: [
            buildProject({projectId: '1', trayId}),
            buildProject({projectId: '2', trayId}),
            buildProject({projectId: '3', trayId})
          ],
          errors: ['1', '2', '3', '4']
        },
        [TRAYS_ROOT]: {
          [trayId]: buildTray({trayId})
        },
        [SETTINGS_ROOT]: {
          maxProjectsToShow: 6
        }
      }
      const {queryByText} = render(<InterestingProjects/>, state)
      expect(queryByText('+2 additional projects')).toBeInTheDocument()
    })
  })
})
