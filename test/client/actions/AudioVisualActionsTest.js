import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {
  setBrokenBuildTimers,
  setTrayNameToggled,
  setBrokenBuildSounds,
  setBrokenBuildSoundFx,
  BROKEN_BUILD_TIMERS_CHANGED,
  TRAY_NAME_TOGGLED,
  BROKEN_BUILD_SOUNDS_CHANGED,
  BROKEN_BUILD_SOUND_FX
} from '../../../src/client/actions/AudioVisualActions'

describe('AudioVisualActions', function () {

  describe('setting broken build timers', function () {

    it('should return the correct type', function () {
      const actual = setBrokenBuildTimers()
      expect(actual).to.have.property('type', BROKEN_BUILD_TIMERS_CHANGED)
    })

    it('should return the given value', function () {
      const actual = setBrokenBuildTimers(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe('setting show tray names', function () {

    it('should return the correct type', function () {
      const actual = setTrayNameToggled()
      expect(actual).to.have.property('type', TRAY_NAME_TOGGLED)
    })

    it('should return the given value', function () {
      const actual = setTrayNameToggled(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe('setting broken build sounds', function () {

    it('should return the correct type', function () {
      const actual = setBrokenBuildSounds()
      expect(actual).to.have.property('type', BROKEN_BUILD_SOUNDS_CHANGED)
    })

    it('should return the given value', function () {
      const actual = setBrokenBuildSounds(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe('setting broken build sound fx', function () {

    it('should return the correct type', function () {
      const actual = setBrokenBuildSoundFx()
      expect(actual).to.have.property('type', BROKEN_BUILD_SOUND_FX)
    })

    it('should return the given value', function () {
      const actual = setBrokenBuildSoundFx('some-url')
      expect(actual).to.have.property('value', 'some-url')
    })
  })
})
