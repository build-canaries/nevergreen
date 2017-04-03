import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/GitHubReducer'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_URL} from '../../../src/client/actions/GitHubActions'
import Immutable from 'immutable'

describe('GitHubReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('set description action', function () {

    it('should set the description property', function () {
      const existingState = Immutable.Map()
      const action = {type: GITHUB_SET_DESCRIPTION, description: 'some-description'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('description', 'some-description')
    })
  })

  describe('set url action', function () {

    it('should set the url property', function () {
      const existingState = Immutable.Map()
      const action = {type: GITHUB_SET_URL, url: 'some-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('url', 'some-url')
    })
  })
})
