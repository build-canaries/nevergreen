import React from 'react'
import {waitForDomChange} from '@testing-library/react'
import {noop} from 'lodash'
import {Monitor} from '../../../src/client/monitor/Monitor'
import {buildTray, render} from '../testHelpers'
import {TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'
import {SUCCESS_ROOT} from '../../../src/client/success/SuccessReducer'
import * as TimerHook from '../../../src/client/common/TimerHook'
import * as ProjectsGateway from '../../../src/client/gateways/ProjectsGateway'
import {fakeRequest} from '../../../src/client/gateways/Gateway'

describe('<Monitor/>', () => {

  const DEFAULT_PROPS = {
    fullScreen: false,
    requestFullScreen: noop
  }

  const trayId = 'some-tray-id'

  beforeEach(() => {
    jest.spyOn(TimerHook, 'useTimer').mockImplementation(noop)
  })

  it('should request fullscreen on mount', () => {
    const requestFullScreen = jest.fn()
    const props = {...DEFAULT_PROPS, requestFullScreen}
    render(<Monitor {...props}/>)
    expect(requestFullScreen).toHaveBeenCalledWith(true)
  })

  it('should cancel fullscreen on unmount', () => {
    const requestFullScreen = jest.fn()
    const props = {...DEFAULT_PROPS, requestFullScreen}
    const {unmount} = render(<Monitor {...props}/>)
    unmount()
    expect(requestFullScreen).toHaveBeenCalledWith(false)
  })

  it('should show a helpful message if no trays are added', () => {
    const state = {
      [TRAYS_ROOT]: {}
    }
    const {queryByText} = render(<Monitor {...DEFAULT_PROPS}/>, state)
    expect(queryByText('Add a CI server via the tracking page to start monitoring')).toBeInTheDocument()
  })

  it('should show a loading screen when first switching to the page', () => {
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      }
    }
    const {queryByTestId} = render(<Monitor {...DEFAULT_PROPS}/>, state)
    expect(queryByTestId('loading')).toBeInTheDocument()
  })

  it('should show a success message if there are no projects', async () => {
    jest.spyOn(TimerHook, 'useTimer').mockImplementationOnce((onTrigger) => onTrigger())
    jest.spyOn(ProjectsGateway, 'interesting').mockReturnValue(fakeRequest([]))
    const state = {
      [TRAYS_ROOT]: {
        [trayId]: buildTray({trayId})
      },
      [SUCCESS_ROOT]: ['some-success-message']
    }
    const {queryByText} = render(<Monitor {...DEFAULT_PROPS}/>, state)
    await waitForDomChange()
    expect(queryByText('some-success-message')).toBeInTheDocument()
  })
})
