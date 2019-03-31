import {INTERESTING_ROOT, reduce} from '../../../src/client/reducers/InterestingReducer'
import {INTERESTING_PROJECTS} from '../../../src/client/actions/Actions'
import {fromJS, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {
  getInterestingErrors,
  getInterestingLoaded,
  getInterestingProjects
} from '../../../src/client/reducers/Selectors'
import {interestingProjects} from '../../../src/client/actions/MonitorActionCreators'
import {Project} from '../../../src/client/domain/Project'

describe('InterestingReducer', () => {

  const reducer = combineReducers({
    [INTERESTING_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[INTERESTING_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INTERESTING_PROJECTS, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: false})
      const action = interestingProjects([], [])
      const newState = reducer(existingState, action)
      expect(getInterestingLoaded(newState)).toBeTruthy()
    })

    test('should set the projects property', () => {
      const existingState = state({projects: []})
      const newProject = new Project({projectId: 'some-project-id'})
      const action = interestingProjects([newProject], [])

      const newState = reducer(existingState, action)

      expect(getInterestingProjects(newState)).toEqual(List.of(newProject))
    })

    test('should set the error property', () => {
      const existingState = state({})
      const action = interestingProjects([], ['some-error'])
      const newState = reducer(existingState, action)
      expect(getInterestingErrors(newState).toJS()).toEqual(['some-error'])
    })
  })
})
