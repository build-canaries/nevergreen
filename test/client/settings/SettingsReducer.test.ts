import {
  getBrokenBuildSoundFx,
  getClickToShowMenu,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getRefreshTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowPrognosis,
  getShowSystemNotifications,
  getShowTrayName,
  getSort,
  MaxProjectsToShow,
  reduce,
  SETTINGS_ROOT,
  SettingsState
} from '../../../src/client/settings/SettingsReducer'
import {Actions} from '../../../src/client/Actions'
import {
  setBrokenBuildSoundFx,
  setClickToShowMenu,
  setMaxProjectsToShow,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBuildLabel,
  setShowBuildTime,
  setShowPrognosis,
  setShowSystemNotifications,
  setShowTrayName,
  setSort
} from '../../../src/client/settings/SettingsActionCreators'
import {buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'
import {Prognosis} from '../../../src/client/domain/Project'
import {configurationImported} from '../../../src/client/backup/BackupActionCreators'
import {SortBy} from '../../../src/client/gateways/ProjectsGateway'

const reducer = testReducer({
  [SETTINGS_ROOT]: reduce
})

function state(existing?: RecursivePartial<SettingsState>) {
  return buildState({[SETTINGS_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should merge show tray name', () => {
    const existingState = state({showTrayName: false})
    const action = configurationImported({[SETTINGS_ROOT]: {showTrayName: true}})
    const newState = reducer(existingState, action)
    expect(getShowTrayName(newState)).toBeTruthy()
  })

  it('should merge build timers enabled', () => {
    const existingState = state({showBuildTime: false})
    const action = configurationImported({[SETTINGS_ROOT]: {showBuildTime: true}})
    const newState = reducer(existingState, action)
    expect(getShowBuildTime(newState)).toBeTruthy()
  })

  it('should merge broken build sounds enabled', () => {
    const existingState = state({playBrokenBuildSoundFx: false})
    const action = configurationImported({[SETTINGS_ROOT]: {playBrokenBuildSoundFx: true}})
    const newState = reducer(existingState, action)
    expect(getPlayBrokenBuildSoundFx(newState)).toBeTruthy()
  })

  it('should merge broken build sound fx', () => {
    const existingState = state({brokenBuildSoundFx: 'some-url'})
    const action = configurationImported({[SETTINGS_ROOT]: {brokenBuildSoundFx: 'another-url'}})
    const newState = reducer(existingState, action)
    expect(getBrokenBuildSoundFx(newState)).toEqual('another-url')
  })

  it('should merge show build label', () => {
    const existingState = state({showBuildLabel: false})
    const action = configurationImported({[SETTINGS_ROOT]: {showBuildLabel: true}})
    const newState = reducer(existingState, action)
    expect(getShowBuildLabel(newState)).toBeTruthy()
  })
})

describe(Actions.SHOW_BUILD_TIME, () => {

  it('should set the broken build timer enabled property', () => {
    const existingState = state({showBuildTime: false})
    const action = setShowBuildTime(true)
    const newState = reducer(existingState, action)
    expect(getShowBuildTime(newState)).toBeTruthy()
  })
})

describe(Actions.PLAY_BROKEN_BUILD_SOUND_FX, () => {

  it('should set the broken build sounds enabled property', () => {
    const existingState = state({playBrokenBuildSoundFx: false})
    const action = setPlayBrokenBuildSoundFx(true)
    const newState = reducer(existingState, action)
    expect(getPlayBrokenBuildSoundFx(newState)).toBeTruthy()
  })
})

describe(Actions.BROKEN_BUILD_SOUND_FX, () => {

  it('should set the broken build sound fx property', () => {
    const existingState = state({brokenBuildSoundFx: 'some-url'})
    const action = setBrokenBuildSoundFx('another-url')
    const newState = reducer(existingState, action)
    expect(getBrokenBuildSoundFx(newState)).toEqual('another-url')
  })
})

describe(Actions.SHOW_TRAY_NAME, () => {

  it('should set the tray name toggled property', () => {
    const existingState = state({showTrayName: false})
    const action = setShowTrayName(true)
    const newState = reducer(existingState, action)
    expect(getShowTrayName(newState)).toBeTruthy()
  })
})

describe(Actions.REFRESH_TIME, () => {

  it('should set the refresh time property', () => {
    const existingState = state({refreshTime: 5})
    const action = setRefreshTime('10')
    const newState = reducer(existingState, action)
    expect(getRefreshTime(newState)).toEqual(10)
  })
})

describe(Actions.SHOW_BUILD_LABEL, () => {

  it('should set the show build label property', () => {
    const existingState = state({showBuildLabel: false})
    const action = setShowBuildLabel(true)
    const newState = reducer(existingState, action)
    expect(getShowBuildLabel(newState)).toBeTruthy()
  })
})

describe(Actions.SHOW_SYSTEM_NOTIFICATIONS, () => {

  it('should set the show browser notifications property', () => {
    const existingState = state({showSystemNotifications: false})
    const action = setShowSystemNotifications(true)
    const newState = reducer(existingState, action)
    expect(getShowSystemNotifications(newState)).toBeTruthy()
  })
})

describe(Actions.SET_MAX_PROJECTS, () => {

  it('should set the max projects to show property', () => {
    const existingState = state({maxProjectsToShow: MaxProjectsToShow.medium})
    const action = setMaxProjectsToShow(MaxProjectsToShow.small)
    const newState = reducer(existingState, action)
    expect(getMaxProjectsToShow(newState)).toEqual(MaxProjectsToShow.small)
  })
})

describe(Actions.CLICK_TO_SHOW_MENU, () => {

  it('should set the click to show menu property', () => {
    const existingState = state({clickToShowMenu: false})
    const action = setClickToShowMenu(true)
    const newState = reducer(existingState, action)
    expect(getClickToShowMenu(newState)).toBeTruthy()
  })
})

describe(Actions.SHOW_PROGNOSIS, () => {

  it('should add the prognosis to show', () => {
    const existingState = state({showPrognosis: []})
    const action = setShowPrognosis(Prognosis.sick, true)
    const newState = reducer(existingState, action)
    expect(getShowPrognosis(newState)).toEqual([Prognosis.sick])
  })

  it('should remove the prognosis to hide', () => {
    const existingState = state({showPrognosis: [Prognosis.sick, Prognosis.sickBuilding]})
    const action = setShowPrognosis(Prognosis.sick, false)
    const newState = reducer(existingState, action)
    expect(getShowPrognosis(newState)).toEqual([Prognosis.sickBuilding])
  })
})

describe(Actions.SET_SORT, () => {

  it('should add the sort', () => {
    const existingState = state({sort: SortBy.default})
    const action = setSort(SortBy.prognosis)
    const newState = reducer(existingState, action)
    expect(getSort(newState)).toEqual(SortBy.prognosis)
  })
})
