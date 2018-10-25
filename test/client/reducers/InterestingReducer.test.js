import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/InterestingReducer'
import {INTERESTING_PROJECTS} from '../../../src/client/actions/Actions'
import {fromJS, List, Map} from 'immutable'

describe('InterestingReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INTERESTING_PROJECTS, function () {

    it('should set the loaded property', function () {
      const existingState = Map({loaded: false})
      const action = {type: INTERESTING_PROJECTS, projects: List()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', true)
    })

    it('should set the projects property', function () {
      const existingState = fromJS({projects: []})
      const newProject = {projectId: 'some-project-id'}
      const action = {type: INTERESTING_PROJECTS, projects: fromJS([newProject])}

      const newState = reduce(existingState, action)

      expect(newState).to.have.property('projects').that.contains(Map(newProject))
    })

    it('should set the error property', function () {
      const existingState = Map()
      const action = {
        type: INTERESTING_PROJECTS,
        projects: List(),
        errors: List(['some-error'])
      }
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('errors').that.contains('some-error')
    })
  })
})
