import {reduce} from '../../../src/client/reducers/InterestingReducer'
import {INTERESTING_PROJECTS} from '../../../src/client/actions/Actions'
import {fromJS, List, Map} from 'immutable'

describe('InterestingReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INTERESTING_PROJECTS, () => {

    test('should set the loaded property', () => {
      const existingState = Map({loaded: false})
      const action = {type: INTERESTING_PROJECTS, projects: List()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('loaded', true)
    })

    test('should set the projects property', () => {
      const existingState = fromJS({projects: []})
      const newProject = {projectId: 'some-project-id'}
      const action = {type: INTERESTING_PROJECTS, projects: fromJS([newProject])}

      const newState = reduce(existingState, action)

      expect(newState.toJS().projects).toEqual(expect.arrayContaining([newProject]))
    })

    test('should set the error property', () => {
      const existingState = Map()
      const action = {
        type: INTERESTING_PROJECTS,
        projects: List(),
        errors: List(['some-error'])
      }
      const newState = reduce(existingState, action)
      expect(newState.toJS().errors).toEqual(expect.arrayContaining(['some-error']))
    })
  })
})
