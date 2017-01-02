import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {
  showBrokenBuildTime,
  showTrayName,
  playBrokenBuildSoundFx,
  setBrokenBuildSoundFx,
  setRefreshTime,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_TRAY_NAME,
  PLAY_BROKEN_BUILD_SOUND_FX,
  BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME
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

  describe('setting refresh time', function () {

    it('should return the correct type', function () {
      const actual = setRefreshTime()
      expect(actual).to.have.property('type', REFRESH_TIME)
    })

    it('should return the given value', function () {
      const actual = setRefreshTime(15)
      expect(actual).to.have.property('value', 15)
    })

    const invalidValues = [-1, 4, 'some-string']

    invalidValues.forEach(function (value) {
      it(`should return 5 second if the value is invalid (${value})`, function () {
        const actual = setRefreshTime(value)
        expect(actual).to.have.property('value', 5)
      })
    })
  })
})
