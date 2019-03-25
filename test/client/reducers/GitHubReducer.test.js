import {reduce} from '../../../src/client/reducers/GitHubReducer'
import {
  GITHUB_SET_DESCRIPTION,
  GITHUB_SET_GIST_ID,
  IMPORT_SUCCESS,
  INITIALISED
} from '../../../src/client/actions/Actions'
import {fromJS, Map} from 'immutable'

describe('GitHubReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = Map({foo: 'bar'})
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should merge the url', () => {
      const existingState = Map({})
      const action = {type: INITIALISED, data: fromJS({github: {url: 'some-url'}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('url', 'some-url')
    })

    test('should merge the description', () => {
      const existingState = Map({})
      const action = {type: INITIALISED, data: fromJS({github: {description: 'some-description'}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('description', 'some-description')
    })

    test('should handle no github data', () => {
      const existingState = Map({url: 'some-url', description: 'some-description'})
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('url', 'some-url')
      expect(newState.toJS()).toHaveProperty('description', 'some-description')
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test(
      'should not merge the url because a successful GitHub import requires it to be known already and likely does not matter if the user is using local import',
      () => {
        const existingState = Map({url: 'some-url'})
        const action = {type: IMPORT_SUCCESS, data: fromJS({github: {url: ''}})}
        const newState = reduce(existingState, action)
        expect(newState.toJS()).toHaveProperty('url', 'some-url')
      }
    )

    test('should merge the description', () => {
      const existingState = Map({})
      const action = {type: IMPORT_SUCCESS, data: fromJS({github: {description: 'some-description'}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('description', 'some-description')
    })

    test('should handle no github data', () => {
      const existingState = Map({url: 'some-url', description: 'some-description'})
      const action = {type: IMPORT_SUCCESS, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('url', 'some-url')
      expect(newState.toJS()).toHaveProperty('description', 'some-description')
    })
  })

  describe(GITHUB_SET_DESCRIPTION, () => {

    test('should set the description property', () => {
      const existingState = Map()
      const action = {type: GITHUB_SET_DESCRIPTION, description: 'some-description'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('description', 'some-description')
    })
  })

  describe(GITHUB_SET_GIST_ID, () => {

    test('should set the id property', () => {
      const existingState = Map()
      const action = {type: GITHUB_SET_GIST_ID, gistId: 'some-id'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('gistId', 'some-id')
    })
  })
})
