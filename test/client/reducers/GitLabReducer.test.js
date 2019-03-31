import {GITLAB_ROOT, reduce} from '../../../src/client/reducers/GitLabReducer'
import {GITLAB_SET_SNIPPET_ID, GITLAB_SET_URL, INITIALISED} from '../../../src/client/actions/Actions'
import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {getGitLabSnippetId, getGitLabUrl} from '../../../src/client/reducers/Selectors'
import {gitLabSetSnippetId, gitLabSetUrl} from '../../../src/client/actions/GitLabActionCreators'

describe('GitLabReducer', () => {

  const reducer = combineReducers({
    [GITLAB_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[GITLAB_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should merge all data', () => {
      const existingState = state({})
      const action = initalised({gitlab: {url: 'some-url', snippetId: 'some-id'}})
      const newState = reducer(existingState, action)
      expect(getGitLabUrl(newState)).toEqual('some-url')
      expect(getGitLabSnippetId(newState)).toEqual('some-id')
    })
  })

  describe(GITLAB_SET_SNIPPET_ID, () => {

    test('should set the id property', () => {
      const existingState = state({})
      const action = gitLabSetSnippetId('some-id')
      const newState = reducer(existingState, action)
      expect(getGitLabSnippetId(newState)).toEqual('some-id')
    })
  })

  describe(GITLAB_SET_URL, () => {

    test('should set the id property', () => {
      const existingState = state({})
      const action = gitLabSetUrl('some-url')
      const newState = reducer(existingState, action)
      expect(getGitLabUrl(newState)).toEqual('some-url')
    })
  })

})
