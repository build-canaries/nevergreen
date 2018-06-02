import {describe, it} from 'mocha'
import {expect} from 'chai'
import {
  MIN_REFRESH_TIME,
  setBrokenBuildSoundFx,
  setMaxProjectsToShow,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBrokenBuildTime,
  setShowBuildLabel,
  setShowBuildTime,
  setShowTrayName,
  VALID_PROJECTS_TO_SHOW
} from '../../../src/client/actions/SettingsActionCreators'
import {
  BROKEN_BUILD_SOUND_FX,
  PLAY_BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME,
  SET_MAX_PROJECTS,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_BUILD_LABEL,
  SHOW_BUILD_TIME,
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
        expect(actual).to.have.property('value', MIN_REFRESH_TIME)
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

  describe(SHOW_BUILD_TIME, function () {

    it('should return the correct type', function () {
      const actual = setShowBuildTime()
      expect(actual).to.have.property('type', SHOW_BUILD_TIME)
    })

    it('should return the given value', function () {
      const actual = setShowBuildTime(true)
      expect(actual).to.have.property('value', true)
    })
  })

  describe(SET_MAX_PROJECTS, function () {

    it('should return the correct type', function () {
      const actual = setMaxProjectsToShow()
      expect(actual).to.have.property('type', SET_MAX_PROJECTS)
    })


    it('should return the nearest valid value for an exact match', function () {
      const actual = setMaxProjectsToShow(12)
      expect(actual).to.have.property('value', 12)
    })

    it('should return the nearest valid value', function () {
      const actual = setMaxProjectsToShow(13)
      expect(actual).to.have.property('value', 12)
    })

    const invalidValues = [-1, 4, 'some-string']

    invalidValues.forEach(function (value) {
      it(`should return min if the value is invalid (${value})`, function () {
        const actual = setMaxProjectsToShow(value)
        expect(actual).to.have.property('value', VALID_PROJECTS_TO_SHOW[0])
      })
    })
  })
})
