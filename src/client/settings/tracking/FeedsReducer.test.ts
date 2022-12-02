import {FeedsState, getFeeds, feedsRoot, reducer as feedsReducer} from './FeedsReducer'
import {feedAdded, feedRemoved, feedUpdated} from './TrackingActionCreators'
import {testReducer} from '../../testUtils/testHelpers'
import {buildFeed, buildState} from '../../testUtils/builders'
import {RecursivePartial} from '../../common/Types'
import {AuthTypes} from '../../domain/Feed'
import {configurationImported} from '../backup/BackupActionCreators'

const reducer = testReducer({
  [feedsRoot]: feedsReducer
})

function state(existing?: RecursivePartial<FeedsState>) {
  return buildState({[feedsRoot]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(configurationImported.toString(), () => {

  it('should set the trays if it is included in the import', () => {
    const feed = buildFeed({trayId: 'trayId'})
    const existingState = state({someId: {}})
    const action = configurationImported({[feedsRoot]: {trayId: feed}})

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
    const action = configurationImported({[feedsRoot]: {trayId: partiallyImportedFeed}})

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

describe(feedAdded.toString(), () => {

  it('should set the tray data', () => {
    const existingState = state({})
    const action = feedAdded({
      trayId: 'trayId',
      authType: AuthTypes.none,
      url: '',
      username: '',
      encryptedPassword: '',
      encryptedAccessToken: ''
    })
    const newState = reducer(existingState, action)
    expect(getFeeds(newState)[0]).toHaveProperty('trayId', 'trayId')
  })
})

describe(feedUpdated.toString(), () => {

  it('should set the given tray data', () => {
    const existingState = state({trayId: buildFeed()})
    const action = feedUpdated({trayId: 'trayId', feed: {name: 'some-name'}})
    const newState = reducer(existingState, action)
    expect(getFeeds(newState)[0].name).toEqual('some-name')
  })
})

describe(feedRemoved.toString(), () => {

  it('should set the tray data', () => {
    const existingState = state({trayId: buildFeed()})
    const action = feedRemoved('trayId')
    const newState = reducer(existingState, action)
    expect(getFeeds(newState)).toEqual([])
  })
})
