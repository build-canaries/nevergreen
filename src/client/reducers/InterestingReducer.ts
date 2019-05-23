import {Actions} from '../actions/Actions'
import {ActionInterestingProjects} from '../actions/MonitorActionCreators'
import {Project} from '../domain/Project'

export interface InterestingState {
  readonly loaded: boolean;
  readonly projects: Project[];
  readonly errors: string[];
}

export const INTERESTING_ROOT = 'interesting'

const DEFAULT_STATE: InterestingState = {
  projects: [],
  errors: [],
  loaded: false
}

export function reduce(state = DEFAULT_STATE, action: ActionInterestingProjects): InterestingState {
  switch (action.type) {
    case Actions.INTERESTING_PROJECTS:
      return {
        loaded: true,
        errors: action.errors,
        projects: action.projects
      }
    default:
      return state
  }
}
