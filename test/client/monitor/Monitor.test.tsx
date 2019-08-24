import React from 'react'
import {noop} from 'lodash'
import {Monitor} from '../../../src/client/monitor/Monitor'
import {buildTray, render} from '../testHelpers'
import {INTERESTING_ROOT} from '../../../src/client/monitor/InterestingReducer'
import {TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'
import {SUCCESS_ROOT} from '../../../src/client/success/SuccessReducer'
import * as TimerHook from '../../../src/client/common/TimerHook'

describe('<Monitor/>', () => {

  const trayId = 'some-tray-id'

  beforeEach(() => {
    jest.spyOn(TimerHook, 'useTimer').mockImplementation(noop)
  })

  test('should show a loading screen when first switching to the page', () => {
    const state = {
      [INTERESTING_ROOT]: {
        loaded: false
      },
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      }
    }
    const {queryByTestId} = render(<Monitor/>, state)
    expect(queryByTestId('loading')).toBeInTheDocument()
  })

  test('should show a success message if there are no projects', () => {
    const state = {
      [INTERESTING_ROOT]: {
        projects: [],
        loaded: true
      },
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SUCCESS_ROOT]: ['some-success-message']
    }
    const {queryByText} = render(<Monitor/>, state)
    expect(queryByText('some-success-message')).toBeInTheDocument()
  })

  test('should show a helpful message if no trays are added', () => {
    const state = {
      [INTERESTING_ROOT]: {
        loaded: true
      },
      [TRAYS_ROOT]: {}
    }
    const {queryByText} = render(<Monitor/>, state)
    expect(queryByText('Add a CI server via the tracking page to start monitoring')).toBeInTheDocument()
  })
})
