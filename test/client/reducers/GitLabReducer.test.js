import {reduce} from '../../../src/client/reducers/GitLabReducer'
import {GITLAB_SET_SNIPPET_ID, GITLAB_SET_URL, INITIALISED} from '../../../src/client/actions/Actions'
import {fromJS, Map} from 'immutable'

describe('GitLabReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = Map({foo: 'bar'})
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should merge all data', () => {
      const existingState = Map({})
      const action = {type: INITIALISED, data: fromJS({gitlab: {url: 'some-url', snippetId: 'some-id'}})}
      const newState = reduce(existingState, action)
      expect(newState).toEqual(Map({url: 'some-url', snippetId: 'some-id'}))
    })
  })

  describe(GITLAB_SET_SNIPPET_ID, () => {

    test('should set the id property', () => {
      const existingState = Map()
      const action = {type: GITLAB_SET_SNIPPET_ID, snippetId: 'some-id'}
      const newState = reduce(existingState, action)
      expect(newState.get('snippetId')).toEqual('some-id')
    })
  })

  describe(GITLAB_SET_URL, () => {

    test('should set the id property', () => {
      const existingState = Map()
      const action = {type: GITLAB_SET_URL, url: 'some-url'}
      const newState = reduce(existingState, action)
      expect(newState.get('url')).toEqual('some-url')
    })
  })

})
