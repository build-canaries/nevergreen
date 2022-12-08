import {
  getSelectedProjectsForFeed,
  selectedRoot,
  projectSelected,
  reducer as selectedReducer,
  SelectedState
} from './SelectedReducer'
import {feedRemoved, feedUpdated} from './TrackingActionCreators'
import {testReducer} from '../../testUtils/testHelpers'
import {buildState} from '../../testUtils/builders'
import {RecursivePartial} from '../../common/Types'
import {TrackingMode} from '../../domain/Feed'
import {configurationImported} from '../backup/BackupActionCreators'

const reducer = testReducer({
  [selectedRoot]: selectedReducer
})

function state(existing?: RecursivePartial<SelectedState>) {
  return buildState({[selectedRoot]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state({foo: []})
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {

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

describe(feedUpdated.toString(), () => {

  it('should add the feed id with an empty set if tracking mode is updated to selected', () => {
    const existingState = state({})
    const action = feedUpdated({trayId: 'trayId', feed: {trackingMode: TrackingMode.selected}})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toHaveLength(0)
  })

  it('should remove the feed id if tracking mode is updated to everything', () => {
    const existingState = state({trayId: []})
    const action = feedUpdated({trayId: 'trayId', feed: {trackingMode: TrackingMode.everything}})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toBeUndefined()
  })

  it('should not remove the feed id if tracking mode was not part of the update', () => {
    const existingState = state({trayId: ['some-project-id']})
    const action = feedUpdated({trayId: 'trayId', feed: {name: 'some-name'}})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toHaveLength(1)
  })
})

describe(feedRemoved.toString(), () => {

  it('should remove the tray id', () => {
    const existingState = state({trayId: []})
    const action = feedRemoved('trayId')
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toBeUndefined()
  })
})

describe(projectSelected.toString(), () => {

  it('should add the project if selected', () => {
    const existingState = state({trayId: ['a', 'b', 'c']})
    const action = projectSelected({trayId: 'trayId', projectIds: ['d'], selected: true})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should remove the project if not selected', () => {
    const existingState = state({trayId: ['a', 'b', 'c']})
    const action = projectSelected({trayId: 'trayId', projectIds: ['b'], selected: false})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForFeed('trayId')(newState)).toEqual(['a', 'c'])
  })
})
