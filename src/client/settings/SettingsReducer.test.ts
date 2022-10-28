import {
  getClickToShowMenu,
  getMaxProjectsToShow,
  getRefreshTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getShowPrognosis,
  getSort,
  MaxProjectsToShow,
  reduce,
  SETTINGS_ROOT,
  SettingsState
} from './SettingsReducer'
import {Actions} from '../Actions'
import {
  setClickToShowMenu,
  setMaxProjectsToShow,
  setRefreshTime,
  setShowBuildLabel,
  setShowBuildTime,
  setShowFeedIdentifier,
  setShowPrognosis,
  setSort,
} from './SettingsActionCreators'
import {testReducer} from '../testUtils/testHelpers'
import {buildState} from '../testUtils/builders'
import {RecursivePartial} from '../common/Types'
import {Prognosis} from '../domain/Project'
import {configurationImported} from './backup/BackupActionCreators'
import {SortBy} from '../gateways/ProjectsGateway'

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
    expect(getShowFeedIdentifier(newState)).toBeTruthy()
  })

  it('should merge build timers enabled', () => {
    const existingState = state({showBuildTime: false})
    const action = configurationImported({[SETTINGS_ROOT]: {showBuildTime: true}})
    const newState = reducer(existingState, action)
    expect(getShowBuildTime(newState)).toBeTruthy()
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

describe(Actions.SHOW_FEED_IDENTIFIER, () => {

  it('should set the tray name toggled property', () => {
    const existingState = state({showTrayName: false})
    const action = setShowFeedIdentifier(true)
    const newState = reducer(existingState, action)
    expect(getShowFeedIdentifier(newState)).toBeTruthy()
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
