import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/InterestingReducer'
import {INTERESTING_PROJECTS} from '../../../src/client/actions/Actions'
import Immutable from 'immutable'

describe('InterestingReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('interesting projects action', function () {

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: false})
      const action = {type: INTERESTING_PROJECTS}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', true)
    })

    it('should set the projects property', function () {
      const existingState = Immutable.Map()
      const action = {type: INTERESTING_PROJECTS, projects: Immutable.List(['a-project'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('projects').that.contains('a-project')
    })

    it('should set the error property', function () {
      const existingState = Immutable.Map()
      const action = {type: INTERESTING_PROJECTS, errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('errors').that.contains('some-error')
    })
  })
})
