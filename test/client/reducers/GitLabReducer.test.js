import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/GitLabReducer'
import {
  GITLAB_SET_URL,
  INITIALISED,
  GITLAB_SET_SNIPPET_ID
} from '../../../src/client/actions/Actions'
import {fromJS, Map} from 'immutable'

describe('GitLabReducer', function () {
  
  it('should return the state unmodified for an unknown action', function () {
    const existingState = Map({foo: 'bar'})
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INITIALISED, function () {

    it('should merge all data', function () {
      const existingState = Map({})
      const action = {type: INITIALISED, data: fromJS({gitlab: {url: 'some-url', snippetId: 'some-id'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.eql(Map({url: 'some-url', snippetId: 'some-id'}))
    })
  })

  describe(GITLAB_SET_SNIPPET_ID, function () {

    it('should set the id property', function () {
      const existingState = Map()
      const action = {type: GITLAB_SET_SNIPPET_ID, snippetId: 'some-id'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('snippetId', 'some-id')
    })
  })

  describe(GITLAB_SET_URL, function () {

    it('should set the id property', function () {
      const existingState = Map()
      const action = {type: GITLAB_SET_URL, url: 'some-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('url', 'some-url')
    })
  })

})