import {getSelectedProjectsForFeed, reduce, SELECTED_ROOT, SelectedState} from './SelectedReducer'
import {Actions} from '../../Actions'
import {feedRemoved, feedUpdated, projectSelected} from './TrackingActionCreators'
import {buildState, testReducer} from '../../testUtils/testHelpers'
import {RecursivePartial} from '../../common/Types'
import {TrackingMode} from '../../domain/Feed'
import {configurationImported} from '../backup/BackupActionCreators'

const reducer = testReducer({
  [SELECTED_ROOT]: reduce
})

function state(existing?: RecursivePartial<SelectedState>) {
  return buildState({[SELECTED_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state({foo: []})
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should set the selected data', () => {
    const existingState = state({oldId: ['foo']})
    const action = configurationImported({selected: {trayId: ['bar']}})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('oldId')(newState)).toBeUndefined()
    expect(getSelectedProjectsForFeed('trayId')(newState)).toEqual(['bar'])
  })

  it('should handle no selected data', () => {
    const existingState = state({oldId: ['foo']})
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('oldId')(newState)).toEqual(['foo'])
  })
})

describe(Actions.FEED_UPDATED, () => {

  it('should add the feed id with an empty set if tracking mode is updated to selected', () => {
    const existingState = state({})
    const action = feedUpdated('trayId', {trackingMode: TrackingMode.selected})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toHaveLength(0)
  })

  it('should remove the feed id if tracking mode is updated to everything', () => {
    const existingState = state({trayId: []})
    const action = feedUpdated('trayId', {trackingMode: TrackingMode.everything})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toBeUndefined()
  })

  it('should not remove the feed id if tracking mode was not part of the update', () => {
    const existingState = state({trayId: ['some-project-id']})
    const action = feedUpdated('trayId', {name: 'some-name'})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toHaveLength(1)
  })
})

describe(Actions.FEED_REMOVED, () => {

  it('should remove the tray id', () => {
    const existingState = state({trayId: []})
    const action = feedRemoved('trayId')
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toBeUndefined()
  })
})

describe(Actions.PROJECT_SELECTED, () => {

  it('should add the project if selected', () => {
    const existingState = state({trayId: ['a', 'b', 'c']})
    const action = projectSelected('trayId', 'd', true)
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should remove the project if not selected', () => {
    const existingState = state({trayId: ['a', 'b', 'c']})
    const action = projectSelected('trayId', 'b', false)
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toEqual(['a', 'c'])
  })
})
