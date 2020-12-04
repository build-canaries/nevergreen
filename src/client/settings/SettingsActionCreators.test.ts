import {
  MIN_REFRESH_TIME,
  setBrokenBuildSoundFx,
  setClickToShowMenu,
  setMaxProjectsToShow,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBuildLabel,
  setShowBuildTime,
  setShowSystemNotifications,
  setShowTrayName,
  setSort,
  toggleVersionCheck
} from './SettingsActionCreators'
import {Actions} from '../Actions'
import {SortBy} from '../gateways/ProjectsGateway'
import {MaxProjectsToShow} from './SettingsReducer'

describe(Actions.SHOW_TRAY_NAME, () => {

  it('should return the correct type', () => {
    const actual = setShowTrayName(false)
    expect(actual).toHaveProperty('type', Actions.SHOW_TRAY_NAME)
  })

  it('should return the given value', () => {
    const actual = setShowTrayName(true)
    expect(actual).toHaveProperty('value', true)
  })
})

describe(Actions.PLAY_BROKEN_BUILD_SOUND_FX, () => {

  it('should return the correct type', () => {
    const actual = setPlayBrokenBuildSoundFx(false)
    expect(actual).toHaveProperty('type', Actions.PLAY_BROKEN_BUILD_SOUND_FX)
  })

  it('should return the given value', () => {
    const actual = setPlayBrokenBuildSoundFx(true)
    expect(actual).toHaveProperty('value', true)
  })
})

describe(Actions.BROKEN_BUILD_SOUND_FX, () => {

  it('should return the correct type', () => {
    const actual = setBrokenBuildSoundFx('irrelevant')
    expect(actual).toHaveProperty('type', Actions.BROKEN_BUILD_SOUND_FX)
  })

  it('should return the given value', () => {
    const actual = setBrokenBuildSoundFx('some-url')
    expect(actual).toHaveProperty('value', 'some-url')
  })
})

describe(Actions.REFRESH_TIME, () => {

  it('should return the correct type', () => {
    const actual = setRefreshTime('0')
    expect(actual).toHaveProperty('type', Actions.REFRESH_TIME)
  })

  it('should return the nearest valid value for an exact match', () => {
    const actual = setRefreshTime('3600')
    expect(actual).toHaveProperty('value', 3600)
  })

  it('should return the nearest valid value', () => {
    const actual = setRefreshTime('15')
    expect(actual).toHaveProperty('value', 10)
  })

  const invalidValues = ['-1', '4', 'some-string']

  invalidValues.forEach(function (value) {
    it(`should return the minimum if the value is invalid (${value})`, () => {
      const actual = setRefreshTime(value)
      expect(actual).toHaveProperty('value', MIN_REFRESH_TIME)
    })
  })
})

describe(Actions.SHOW_BUILD_LABEL, () => {

  it('should return the correct type', () => {
    const actual = setShowBuildLabel(false)
    expect(actual).toHaveProperty('type', Actions.SHOW_BUILD_LABEL)
  })

  it('should return the given value', () => {
    const actual = setShowTrayName(true)
    expect(actual).toHaveProperty('value', true)
  })
})

describe(Actions.SHOW_SYSTEM_NOTIFICATIONS, () => {

  it('should return the correct type', () => {
    const actual = setShowSystemNotifications(false)
    expect(actual).toHaveProperty('type', Actions.SHOW_SYSTEM_NOTIFICATIONS)
  })

  it('should return the given value', () => {
    const actual = setShowSystemNotifications(true)
    expect(actual).toHaveProperty('value', true)
  })
})

describe(Actions.SHOW_BUILD_TIME, () => {

  it('should return the correct type', () => {
    const actual = setShowBuildTime(false)
    expect(actual).toHaveProperty('type', Actions.SHOW_BUILD_TIME)
  })

  it('should return the given value', () => {
    const actual = setShowBuildTime(true)
    expect(actual).toHaveProperty('value', true)
  })
})

describe(Actions.SET_MAX_PROJECTS, () => {

  it('should return the correct type', () => {
    const actual = setMaxProjectsToShow(MaxProjectsToShow.medium)
    expect(actual).toHaveProperty('type', Actions.SET_MAX_PROJECTS)
  })


  it('should return the nearest valid value for an exact match', () => {
    const actual = setMaxProjectsToShow(MaxProjectsToShow.all)
    expect(actual).toHaveProperty('value', MaxProjectsToShow.all)
  })
})

describe(Actions.CLICK_TO_SHOW_MENU, () => {

  it('should return the correct type', () => {
    const actual = setClickToShowMenu(false)
    expect(actual).toHaveProperty('type', Actions.CLICK_TO_SHOW_MENU)
  })

  it('should return the given value', () => {
    const actual = setClickToShowMenu(true)
    expect(actual).toHaveProperty('value', true)
  })
})

describe(Actions.SET_SORT, () => {

  it('should return the correct type', () => {
    const actual = setSort(SortBy.description)
    expect(actual).toHaveProperty('type', Actions.SET_SORT)
  })

  it('should return the given value', () => {
    const actual = setSort(SortBy.description)
    expect(actual).toHaveProperty('value', SortBy.description)
  })
})

describe(Actions.TOGGLE_VERSION_CHECK, () => {

  it('should return the correct type', () => {
    const actual = toggleVersionCheck()
    expect(actual).toHaveProperty('type', Actions.TOGGLE_VERSION_CHECK)
  })
})

