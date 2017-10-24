import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/GitHubReducer'
import {
  GITHUB_SET_DESCRIPTION,
  GITHUB_SET_GIST_ID,
  IMPORT_SUCCESS,
  INITIALISED
} from '../../../src/client/actions/Actions'
import Immutable from 'immutable'

describe('GitHubReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialised action', function () {

    it('should merge the url', function () {
      const existingState = Immutable.Map({})
      const action = {type: INITIALISED, data: Immutable.fromJS({github: {url: 'some-url'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('url', 'some-url')
    })

    it('should merge the description', function () {
      const existingState = Immutable.Map({})
      const action = {type: INITIALISED, data: Immutable.fromJS({github: {description: 'some-description'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('description', 'some-description')
    })

    it('should handle no github data', function () {
      const existingState = Immutable.Map({url: 'some-url', description: 'some-description'})
      const action = {type: INITIALISED, data: Immutable.Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('url', 'some-url')
      expect(newState).to.have.property('description', 'some-description')
    })
  })

  describe('import success action', function () {

    it('should not merge the url because a successful GitHub import requires it to be known already and likely does not matter if the user is using local import', function () {
      const existingState = Immutable.Map({url: 'some-url'})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({github: {url: ''}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('url', 'some-url')
    })

    it('should merge the description', function () {
      const existingState = Immutable.Map({})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({github: {description: 'some-description'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('description', 'some-description')
    })

    it('should handle no github data', function () {
      const existingState = Immutable.Map({url: 'some-url', description: 'some-description'})
      const action = {type: IMPORT_SUCCESS, data: Immutable.Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('url', 'some-url')
      expect(newState).to.have.property('description', 'some-description')
    })
  })

  describe('set description action', function () {

    it('should set the description property', function () {
      const existingState = Immutable.Map()
      const action = {type: GITHUB_SET_DESCRIPTION, description: 'some-description'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('description', 'some-description')
    })
  })

  describe('set gist id action', function () {

    it('should set the id property', function () {
      const existingState = Immutable.Map()
      const action = {type: GITHUB_SET_GIST_ID, gistId: 'some-id'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('gistId', 'some-id')
    })
  })
})
