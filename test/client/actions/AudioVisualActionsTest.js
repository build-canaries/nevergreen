import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {
  showBrokenBuildTime,
  showTrayName,
  playBrokenBuildSoundFx,
  setBrokenBuildSoundFx,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_TRAY_NAME,
  PLAY_BROKEN_BUILD_SOUND_FX,
  BROKEN_BUILD_SOUND_FX
} from '../../../src/client/actions/AudioVisualActions'

describe('AudioVisualActions', function () {

  describe('setting broken build timers', function () {

    it('should return the correct type', function () {
      const actual = showBrokenBuildTime()
      expect(actual).to.have.property('type', SHOW_BROKEN_BUILD_TIME)
    })

    it('should return the given value', function () {
      const actual = showBrokenBuildTime(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe('setting show tray names', function () {

    it('should return the correct type', function () {
      const actual = showTrayName()
      expect(actual).to.have.property('type', SHOW_TRAY_NAME)
    })

    it('should return the given value', function () {
      const actual = showTrayName(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe('setting broken build sounds', function () {

    it('should return the correct type', function () {
      const actual = playBrokenBuildSoundFx()
      expect(actual).to.have.property('type', PLAY_BROKEN_BUILD_SOUND_FX)
    })

    it('should return the given value', function () {
      const actual = playBrokenBuildSoundFx(true)
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
