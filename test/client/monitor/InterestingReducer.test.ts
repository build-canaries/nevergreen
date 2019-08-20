import {
  getInterestingErrors,
  getInterestingLoaded,
  getInterestingProjects,
  INTERESTING_ROOT,
  InterestingState,
  reduce
} from '../../../src/client/monitor/InterestingReducer'
import {Actions} from '../../../src/client/Actions'
import {interestingProjects} from '../../../src/client/monitor/MonitorActionCreators'
import {buildProject, buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'

describe('InterestingReducer', () => {

  const reducer = testReducer({
    [INTERESTING_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<InterestingState>) {
    return buildState({[INTERESTING_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.INTERESTING_PROJECTS, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: false})
      const action = interestingProjects([], [])
      const newState = reducer(existingState, action)
      expect(getInterestingLoaded(newState)).toBeTruthy()
    })

    test('should set the projects property', () => {
      const existingState = state({projects: []})
      const newProject = buildProject({projectId: 'some-project-id'})
      const action = interestingProjects([newProject], [])

      const newState = reducer(existingState, action)

      expect(getInterestingProjects(newState)).toEqual([newProject])
    })

    test('should set the error property', () => {
      const existingState = state({})
      const action = interestingProjects([], ['some-error'])
      const newState = reducer(existingState, action)
      expect(getInterestingErrors(newState)).toEqual(['some-error'])
    })
  })
})
