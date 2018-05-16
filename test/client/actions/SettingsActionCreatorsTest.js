import {describe, it} from 'mocha'
import {expect} from 'chai'
import {
  setBrokenBuildSoundFx,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBrokenBuildTime,
  setShowBuildLabel,
  setShowTrayName
} from '../../../src/client/actions/SettingsActionCreators'
import {
  BROKEN_BUILD_SOUND_FX,
  PLAY_BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_BUILD_LABEL,
  SHOW_TRAY_NAME
} from '../../../src/client/actions/Actions'

describe('SettingsActionCreators', function () {

  describe(SHOW_BROKEN_BUILD_TIME, function () {

    it('should return the correct type', function () {
      const actual = setShowBrokenBuildTime()
      expect(actual).to.have.property('type', SHOW_BROKEN_BUILD_TIME)
    })

    it('should return the given value', function () {
      const actual = setShowBrokenBuildTime(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe(SHOW_TRAY_NAME, function () {

    it('should return the correct type', function () {
      const actual = setShowTrayName()
      expect(actual).to.have.property('type', SHOW_TRAY_NAME)
    })

    it('should return the given value', function () {
      const actual = setShowTrayName(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe(PLAY_BROKEN_BUILD_SOUND_FX, function () {

    it('should return the correct type', function () {
      const actual = setPlayBrokenBuildSoundFx()
      expect(actual).to.have.property('type', PLAY_BROKEN_BUILD_SOUND_FX)
    })

    it('should return the given value', function () {
      const actual = setPlayBrokenBuildSoundFx(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe(BROKEN_BUILD_SOUND_FX, function () {

    it('should return the correct type', function () {
      const actual = setBrokenBuildSoundFx()
      expect(actual).to.have.property('type', BROKEN_BUILD_SOUND_FX)
    })

    it('should return the given value', function () {
      const actual = setBrokenBuildSoundFx('some-url')
      expect(actual).to.have.property('value', 'some-url')
    })
  })

  describe(REFRESH_TIME, function () {

    it('should return the correct type', function () {
      const actual = setRefreshTime()
      expect(actual).to.have.property('type', REFRESH_TIME)
    })

    it('should return the nearest valid value for an exact match', function () {
      const actual = setRefreshTime(3600)
      expect(actual).to.have.property('value', 3600)
    })

    it('should return the nearest valid value', function () {
      const actual = setRefreshTime(15)
      expect(actual).to.have.property('value', 10)
    })

    const invalidValues = [-1, 4, 'some-string']

    invalidValues.forEach(function (value) {
      it(`should return 5 second if the value is invalid (${value})`, function () {
        const actual = setRefreshTime(value)
        expect(actual).to.have.property('value', 5)
      })
    })
  })

  describe(SHOW_BUILD_LABEL, function () {

    it('should return the correct type', function () {
      const actual = setShowBuildLabel()
      expect(actual).to.have.property('type', SHOW_BUILD_LABEL)
    })

    it('should return the given value', function () {
      const actual = setShowTrayName(true)
      expect(actual).to.have.property('value', true)
    })
  })
})
