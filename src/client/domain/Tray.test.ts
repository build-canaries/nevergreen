import {trayIdentifier} from './Tray'
import {buildTray} from '../testHelpers'

describe('getIdentifier', () => {

  it('should return Nevergreen for null because that means there was not a matching tray', () => {
    expect(trayIdentifier(null)).toEqual('Nevergreen')
  })

  it('should return Nevergreen for undefined because that means there was not a matching tray', () => {
    expect(trayIdentifier()).toEqual('Nevergreen')
  })

  it('should return the name by preference', () => {
    expect(trayIdentifier(buildTray({name: 'some-name'}))).toEqual('some-name')
  })

  it('should return the URL if there is no name', () => {
    expect(trayIdentifier(buildTray({name: '', url: 'some-url'}))).toEqual('some-url')
  })
})
