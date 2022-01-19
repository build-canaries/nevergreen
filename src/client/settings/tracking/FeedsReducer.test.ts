import {getFeeds, reduce, FEEDS_ROOT, FeedsState} from './FeedsReducer'
import {Actions} from '../../Actions'
import {projectsFetched, feedAdded, feedRemoved, feedUpdated} from './TrackingActionCreators'
import * as DateTime from '../../common/DateTime'
import {buildProject, buildState, buildFeed, testReducer} from '../../testHelpers'
import {RecursivePartial} from '../../common/Types'
import {AuthTypes} from '../../domain/Feed'
import {configurationImported} from '../backup/BackupActionCreators'

const reducer = testReducer({
  [FEEDS_ROOT]: reduce
})

function state(existing?: RecursivePartial<FeedsState>) {
  return buildState({[FEEDS_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should set the trays if it is included in the import', () => {
    const feed = buildFeed({trayId: 'trayId'})
    const existingState = state({someId: {}})
    const action = configurationImported({[FEEDS_ROOT]: {trayId: feed}})

    const newState = reducer(existingState, action)

    expect(getFeeds(newState)).toEqual([feed])
  })

  it('should set any required missing values to defaults', () => {
    const existingState = state({someId: {}})
    const trayId = 'trayId'
    const completeFeed = buildFeed({trayId})
    const partiallyImportedFeed = {
      trayId,
      url: completeFeed.url,
      name: completeFeed.name // name isn't required but the default name is random, so setting makes the test simpler
    }
    const action = configurationImported({[FEEDS_ROOT]: {trayId: partiallyImportedFeed}})

    const newState = reducer(existingState, action)

    expect(getFeeds(newState)).toEqual([completeFeed])
  })

  it('should handle no trays data', () => {
    const existingState = state({})
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(newState).toEqual(existingState)
  })
})

describe(Actions.FEED_ADDED, () => {

  it('should set the tray data', () => {
    const existingState = state({})
    const action = feedAdded('trayId', '', AuthTypes.none, '', '', '')
    const newState = reducer(existingState, action)
    expect(getFeeds(newState)[0]).toHaveProperty('trayId', 'trayId')
  })
})

describe(Actions.FEED_UPDATED, () => {

  it('should set the given tray data', () => {
    const existingState = state({trayId: buildFeed()})
    const action = feedUpdated('trayId', {name: 'some-name'})
    const newState = reducer(existingState, action)
    expect(getFeeds(newState)[0].name).toEqual('some-name')
  })
})

describe(Actions.FEED_REMOVED, () => {

  it('should set the tray data', () => {
    const existingState = state({trayId: buildFeed()})
    const action = feedRemoved('trayId')
    const newState = reducer(existingState, action)
    expect(getFeeds(newState)).toEqual([])
  })
})

describe(Actions.PROJECTS_FETCHED, () => {

  it('should set timestamp', () => {
    jest.spyOn(DateTime, 'now').mockReturnValue('some-timestamp')
    const existingState = state({trayId: buildFeed()})
    const action = projectsFetched('trayId', [], false)
    const newState = reducer(existingState, action)
    expect(getFeeds(newState)[0].timestamp).toEqual('some-timestamp')
  })

  it('should set server type', () => {
    const existingState = state({trayId: buildFeed()})
    const action = projectsFetched('trayId', [buildProject({serverType: 'some-type'})], false)
    const newState = reducer(existingState, action)
    expect(getFeeds(newState)[0].serverType).toEqual('some-type')
  })
})
