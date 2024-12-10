import type { RecursivePartial } from '../../common/Types'
import {
  displaySettingsRoot,
  DisplaySettingsState,
  getMaxProjectsToShow,
  getRefreshTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getShowPrognosisName,
  getSort,
  MaxProjectsToShow,
  reducer as settingsReducer,
  setMaxProjectsToShow,
  setRefreshTime,
  setShowBuildLabel,
  setShowBuildTime,
  setShowFeedIdentifier,
  setShowPrognosisName,
  setSort,
  SortBy,
} from './DisplaySettingsReducer'
import { testReducer } from '../../testUtils/testHelpers'
import { buildState } from '../../testUtils/builders'
import { configurationImported } from '../backup/BackupActionCreators'

const reducer = testReducer({
  [displaySettingsRoot]: settingsReducer,
})

function state(existing?: RecursivePartial<DisplaySettingsState>) {
  return buildState({ [displaySettingsRoot]: existing })
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, { type: 'not-a-real-action' })
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {
  it('should merge show tray name', () => {
    const existingState = state({ showTrayName: false })
    const action = configurationImported({
      [displaySettingsRoot]: { showTrayName: true },
    })
    const newState = reducer(existingState, action)
    expect(getShowFeedIdentifier(newState)).toBeTruthy()
  })

  it('should merge show prognosis name enabled', () => {
    const existingState = state({ showPrognosisName: false })
    const action = configurationImported({
      [displaySettingsRoot]: { showPrognosisName: true },
    })
    const newState = reducer(existingState, action)
    expect(getShowPrognosisName(newState)).toBeTruthy()
  })

  it('should merge build timers enabled', () => {
    const existingState = state({ showBuildTime: false })
    const action = configurationImported({
      [displaySettingsRoot]: { showBuildTime: true },
    })
    const newState = reducer(existingState, action)
    expect(getShowBuildTime(newState)).toBeTruthy()
  })

  it('should merge show build label', () => {
    const existingState = state({ showBuildLabel: false })
    const action = configurationImported({
      [displaySettingsRoot]: { showBuildLabel: true },
    })
    const newState = reducer(existingState, action)
    expect(getShowBuildLabel(newState)).toBeTruthy()
  })
})

describe(setShowPrognosisName.toString(), () => {
  it('should set the broken build timer enabled property', () => {
    const existingState = state({ showPrognosisName: false })
    const action = setShowPrognosisName(true)
    const newState = reducer(existingState, action)
    expect(getShowPrognosisName(newState)).toBeTruthy()
  })
})

describe(setShowBuildTime.toString(), () => {
  it('should set the broken build timer enabled property', () => {
    const existingState = state({ showBuildTime: false })
    const action = setShowBuildTime(true)
    const newState = reducer(existingState, action)
    expect(getShowBuildTime(newState)).toBeTruthy()
  })
})

describe(setShowFeedIdentifier.toString(), () => {
  it('should set the tray name toggled property', () => {
    const existingState = state({ showTrayName: false })
    const action = setShowFeedIdentifier(true)
    const newState = reducer(existingState, action)
    expect(getShowFeedIdentifier(newState)).toBeTruthy()
  })
})

describe(setRefreshTime.toString(), () => {
  it('should set the refresh time property', () => {
    const existingState = state({ refreshTime: 300 })
    const action = setRefreshTime(60)
    const newState = reducer(existingState, action)
    expect(getRefreshTime(newState)).toEqual(60)
  })

  it('should return the nearest valid value', () => {
    const existingState = state({ refreshTime: 5 })
    const action = setRefreshTime(15)
    const newState = reducer(existingState, action)
    expect(getRefreshTime(newState)).toEqual(10)
  })

  const invalidValues = [-1, 4, NaN]

  invalidValues.forEach(function (value) {
    it(`should return the minimum if the value is invalid (${value})`, () => {
      const existingState = state({ refreshTime: 300 })
      const action = setRefreshTime(value)
      const newState = reducer(existingState, action)
      expect(getRefreshTime(newState)).toEqual(5)
    })
  })
})

describe(setShowBuildLabel.toString(), () => {
  it('should set the show build label property', () => {
    const existingState = state({ showBuildLabel: false })
    const action = setShowBuildLabel(true)
    const newState = reducer(existingState, action)
    expect(getShowBuildLabel(newState)).toBeTruthy()
  })
})

describe(setMaxProjectsToShow.toString(), () => {
  it('should set the max projects to show property', () => {
    const existingState = state({
      maxProjectsToShow: MaxProjectsToShow.medium,
    })
    const action = setMaxProjectsToShow(MaxProjectsToShow.small)
    const newState = reducer(existingState, action)
    expect(getMaxProjectsToShow(newState)).toEqual(MaxProjectsToShow.small)
  })
})

describe(setSort.toString(), () => {
  it('should add the sort', () => {
    const existingState = state({ sort: SortBy.default })
    const action = setSort(SortBy.prognosis)
    const newState = reducer(existingState, action)
    expect(getSort(newState)).toEqual(SortBy.prognosis)
  })
})
