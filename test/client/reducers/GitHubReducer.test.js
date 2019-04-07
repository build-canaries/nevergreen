import {GITHUB_ROOT, reduce} from '../../../src/client/reducers/GitHubReducer'
import {
  GITHUB_SET_DESCRIPTION,
  GITHUB_SET_GIST_ID,
  GITHUB_SET_URL,
  IMPORT_SUCCESS,
  INITIALISED
} from '../../../src/client/actions/Actions'
import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {getGistDescription, getGistId, getGitHubUrl} from '../../../src/client/reducers/Selectors'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {gitHubSetDescription, gitHubSetGistId, gitHubSetUrl} from '../../../src/client/actions/GitHubActionCreators'

describe('GitHubReducer', () => {

  const reducer = combineReducers({
    [GITHUB_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[GITHUB_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should merge the gistId', () => {
      const existingState = state({})
      const action = initalised({github: {gistId: 'some-id'}})
      const newState = reducer(existingState, action)
      expect(getGistId(newState)).toEqual('some-id')
    })

    test('should merge the description', () => {
      const existingState = state({})
      const action = initalised({github: {description: 'some-description'}})
      const newState = reducer(existingState, action)
      expect(getGistDescription(newState)).toEqual('some-description')
    })

    test('should handle no github data', () => {
      const existingState = state({gistId: 'some-id', description: 'some-description'})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getGistId(newState)).toEqual('some-id')
      expect(getGistDescription(newState)).toEqual('some-description')
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should not merge the gist id because a successful GitHub import requires it to be known already and likely does not matter if the user is using local import', () => {
      const existingState = state({gistId: 'some-id'})
      const action = importSuccess({github: {gistId: ''}})
      const newState = reducer(existingState, action)
      expect(getGistId(newState)).toEqual('some-id')
    })

    test('should merge the description', () => {
      const existingState = state({})
      const action = importSuccess({github: {description: 'some-description'}})
      const newState = reducer(existingState, action)
      expect(getGistDescription(newState)).toEqual('some-description')
    })

    test('should handle no github data', () => {
      const existingState = state({gistId: 'some-id', description: 'some-description'})
      const action = importSuccess({})
      const newState = reducer(existingState, action)
      expect(getGistId(newState)).toEqual('some-id')
      expect(getGistDescription(newState)).toEqual('some-description')
    })
  })

  describe(GITHUB_SET_DESCRIPTION, () => {

    test('should set the description property', () => {
      const existingState = state({})
      const action = gitHubSetDescription('some-description')
      const newState = reducer(existingState, action)
      expect(getGistDescription(newState)).toEqual('some-description')
    })
  })

  describe(GITHUB_SET_GIST_ID, () => {

    test('should set the id property', () => {
      const existingState = state({})
      const action = gitHubSetGistId('some-id')
      const newState = reducer(existingState, action)
      expect(getGistId(newState)).toEqual('some-id')
    })
  })

  describe(GITHUB_SET_URL, () => {

    test('should set the id property', () => {
      const existingState = state({url: ''})
      const action = gitHubSetUrl('some-url')
      const newState = reducer(existingState, action)
      expect(getGitHubUrl(newState)).toEqual('some-url')
    })
  })
})
