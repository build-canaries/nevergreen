import React from 'react'
import {Tray} from '../../../../src/client/tracking/tray/Tray'
import {buildTray, render} from '../../testHelpers'
import {TRAYS_ROOT} from '../../../../src/client/tracking/TraysReducer'

describe('<Tray/>', () => {

  const DEFAULT_PROPS = {
    trayId: 'trayId',
    index: 1
  }

  it('should use the name as the title if it exists', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          name: 'some-name'
        })
      }
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} />, state)
    expect(getByTestId('container-title')).toHaveTextContent('some-name')
  })

  it('should use the URL as the sub title if a name exists', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          name: 'some-name',
          url: 'http://some-url'
        })
      }
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} />, state)
    expect(getByTestId('container-sub-title')).toHaveTextContent('http://some-url')
  })

  it('should use the URL as the title if no name exists', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          name: '',
          url: 'http://some-url'
        })
      }
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} />, state)
    expect(getByTestId('container-title')).toHaveTextContent('http://some-url')
  })

  it('should redact any password in the URL', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          name: '',
          url: 'https://username:password@some.url/'
        })
      }
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} />, state)
    expect(getByTestId('container-title')).toHaveTextContent('https://username:*****@some.url/')
  })

  it('should redact any query parameters as they are likely to be API tokens', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          name: '',
          url: 'https://some.url/?token=some-token'
        })
      }
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} />, state)
    expect(getByTestId('container-title')).toHaveTextContent('https://some.url/?token=*****')
  })

  it('should not error when URL is invalid', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          name: '',
          url: 'invalid'
        })
      }
    }
    const {getByTestId} = render(<Tray {...DEFAULT_PROPS} />, state)
    expect(getByTestId('container-title')).toHaveTextContent('')
  })
})
