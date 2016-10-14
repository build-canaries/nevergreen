import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/AudioVisualReducer'
import {INITIALISED} from '../../../src/client/actions/NevergreenActions'
import {IMPORTED_DATA} from '../../../src/client/actions/BackupActions'
import {
  BROKEN_BUILD_TIMERS_CHANGED,
  BROKEN_BUILD_SOUNDS_CHANGED,
  BROKEN_BUILD_SOUND_FX,
  TRAY_NAME_TOGGLED
} from '../../../src/client/actions/AudioVisualActions'
import Immutable from 'immutable'

describe('AudioVisualReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialised action', function () {

    it('should merge show tray name', function () {
      const existingState = Immutable.Map({showTrayNameEnabled: false})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {showTrayNameEnabled: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showTrayNameEnabled', true)
    })

    it('should merge broken build timers enabled', function () {
      const existingState = Immutable.Map({brokenBuildTimersEnabled: false})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {brokenBuildTimersEnabled: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildTimersEnabled', true)
    })

    it('should merge broken build sounds enabled', function () {
      const existingState = Immutable.Map({brokenBuildSoundsEnabled: false})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {brokenBuildSoundsEnabled: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildSoundsEnabled', true)
    })

    it('should merge broken build sound fx', function () {
      const existingState = Immutable.Map({brokenBuildSoundFx: 'some-url'})
      const action = {type: INITIALISED, data: Immutable.fromJS({audioVisual: {brokenBuildSoundFx: 'another-url'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildSoundFx', 'another-url')
    })
  })

  describe('imported data action', function () {

    it('should merge show tray name', function () {
      const existingState = Immutable.Map({showTrayNameEnabled: false})
      const action = {type: IMPORTED_DATA, data: Immutable.fromJS({audioVisual: {showTrayNameEnabled: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showTrayNameEnabled', true)
    })

    it('should merge broken build timers enabled', function () {
      const existingState = Immutable.Map({brokenBuildTimersEnabled: false})
      const action = {type: IMPORTED_DATA, data: Immutable.fromJS({audioVisual: {brokenBuildTimersEnabled: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildTimersEnabled', true)
    })

    it('should merge broken build sounds enabled', function () {
      const existingState = Immutable.Map({brokenBuildSoundsEnabled: false})
      const action = {type: IMPORTED_DATA, data: Immutable.fromJS({audioVisual: {brokenBuildSoundsEnabled: true}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildSoundsEnabled', true)
    })

    it('should merge broken build sound fx', function () {
      const existingState = Immutable.Map({brokenBuildSoundFx: 'some-url'})
      const action = {type: IMPORTED_DATA, data: Immutable.fromJS({audioVisual: {brokenBuildSoundFx: 'another-url'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildSoundFx', 'another-url')
    })
  })

  describe('broken build timers changed action', function () {

    it('should set the broken build timer enabled property', function () {
      const existingState = Immutable.Map({brokenBuildTimersEnabled: false})
      const action = {type: BROKEN_BUILD_TIMERS_CHANGED, value: true}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildTimersEnabled', true)
    })
  })

  describe('broken build sounds enabled action', function () {

    it('should set the broken build sounds enabled property', function () {
      const existingState = Immutable.Map({brokenBuildSoundsEnabled: false})
      const action = {type: BROKEN_BUILD_SOUNDS_CHANGED, value: true}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('brokenBuildSoundsEnabled', true)
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
      const existingState = Immutable.Map({showTrayNameEnabled: false})
      const action = {type: TRAY_NAME_TOGGLED, value: true}
      const newState = reduce(existingState, action)
      expect(newState).to.contain.property('showTrayNameEnabled', true)
    })
  })
})
