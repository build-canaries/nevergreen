import React from 'react'
import {Tray} from '../../../src/client/tracking/Tray'
import {buildTray, render} from '../testHelpers'
import {TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'

const DEFAULT_PROPS = {
  tray: buildTray(),
  index: 1,
  highlightTray: '',
  refreshTray: ''
}

describe('tray title', () => {

  it('should use the name if it exists', () => {
    const tray = buildTray({
      trayId: 'trayId',
      name: 'some-name'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} tray={tray}/>, state)
    expect(getByTestId('container-title')).toHaveTextContent('some-name')
  })

  it('should use the URL as the sub title if a name exists', () => {
    const tray = buildTray({
      trayId: 'trayId',
      name: 'some-name',
      url: 'http://some-url'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} tray={tray}/>, state)
    expect(getByTestId('container-sub-title')).toHaveTextContent('http://some-url')
  })

  it('should use the URL as the title if no name exists, redacting the password and any query parameters (as they are likely to be API tokens)', () => {
    const tray = buildTray({
      trayId: 'trayId',
      name: '',
      url: 'https://username:password@some.url/?token=some-token'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} tray={tray}/>, state)
    expect(getByTestId('container-title')).toHaveTextContent('https://username:*****@some.url/?token=*****')
  })

  it('should not error when URL is invalid', () => {
    const tray = buildTray({
      trayId: 'trayId',
      name: '',
      url: 'invalid'
    })
    const state = {
      [TRAYS_ROOT]: {trayId: tray}
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} tray={tray}/>, state)
    expect(getByTestId('container-title')).toHaveTextContent('')
  })
})
