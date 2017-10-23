import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/SettingsReducer'
import {
  BROKEN_BUILD_SOUND_FX,
  INITIALISED, PLAY_BROKEN_BUILD_SOUND_FX, SHOW_BROKEN_BUILD_TIME,
  SHOW_TRAY_NAME
} from '../../../src/client/actions/Actions'
import {IMPORT_SUCCESS} from '../../../src/client/actions/Actions'
import {
  REFRESH_TIME
} from '../../../src/client/actions/Actions'
import Immutable from 'immutable'

describe('SettingsReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialised action', function () {

    it('should merge show tray name', function () {
      const existingState = Immutable.Map({showTrayName: false})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {showTrayName: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showTrayName', true)
    })

    it('should merge broken build timers enabled', function () {
      const existingState = Immutable.Map({showBrokenBuildTime: false})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {showBrokenBuildTime: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showBrokenBuildTime', true)
    })

    it('should merge broken build sounds enabled', function () {
      const existingState = Immutable.Map({playBrokenBuildSoundFx: false})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {playBrokenBuildSoundFx: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('playBrokenBuildSoundFx', true)
    })

    it('should merge broken build sound fx', function () {
      const existingState = Immutable.Map({brokenBuildSoundFx: 'some-url'})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {brokenBuildSoundFx: 'another-url'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildSoundFx', 'another-url')
    })

    it('should merge refresh time', function () {
      const existingState = Immutable.Map({refreshTime: 5})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {refreshTime: 10}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('refreshTime', 10)
    })

    it('should merge show build label', function () {
      const existingState = Immutable.Map({showBuildLabel: false})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {showBuildLabel: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showBuildLabel', true)
    })
  })

  describe('imported data action', function () {

    it('should merge show tray name', function () {
      const existingState = Immutable.Map({showTrayName: false})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({audioVisual: {showTrayName: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showTrayName', true)
    })

    it('should merge broken build timers enabled', function () {
      const existingState = Immutable.Map({showBrokenBuildTime: false})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({audioVisual: {showBrokenBuildTime: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showBrokenBuildTime', true)
    })

    it('should merge broken build sounds enabled', function () {
      const existingState = Immutable.Map({playBrokenBuildSoundFx: false})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({audioVisual: {playBrokenBuildSoundFx: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('playBrokenBuildSoundFx', true)
    })

    it('should merge broken build sound fx', function () {
      const existingState = Immutable.Map({brokenBuildSoundFx: 'some-url'})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({audioVisual: {brokenBuildSoundFx: 'another-url'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildSoundFx', 'another-url')
    })

    it('should merge show build label', function () {
      const existingState = Immutable.Map({showBuildLabel: false})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({audioVisual: {showBuildLabel: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showBuildLabel', true)
    })
  })

  describe('broken build timers changed action', function () {

    it('should set the broken build timer enabled property', function () {
      const existingState = Immutable.Map({showBrokenBuildTime: false})
      const action = {type: SHOW_BROKEN_BUILD_TIME, value: true}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showBrokenBuildTime', true)
    })
  })

  describe('broken build sounds enabled action', function () {

    it('should set the broken build sounds enabled property', function () {
      const existingState = Immutable.Map({playBrokenBuildSoundFx: false})
      const action = {type: PLAY_BROKEN_BUILD_SOUND_FX, value: true}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('playBrokenBuildSoundFx', true)
    })
  })

  describe('broken build sound fx action', function () {

    it('should set the broken build sound fx property', function () {
      const existingState = Immutable.Map({brokenBuildSoundFx: 'some-url'})
      const action = {type: BROKEN_BUILD_SOUND_FX, value: 'another-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildSoundFx', 'another-url')
    })
  })

  describe('tray name toggled action', function () {

    it('should set the tray name toggled property', function () {
      const existingState = Immutable.Map({showTrayName: false})
      const action = {type: SHOW_TRAY_NAME, value: true}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showTrayName', true)
    })
  })

  describe('refresh time updated', function () {

    it('should set the refresh time property', function () {
      const existingState = Immutable.Map({refreshTime: 5})
      const action = {type: REFRESH_TIME, value: 10}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('refreshTime', 10)
    })
  })
})
