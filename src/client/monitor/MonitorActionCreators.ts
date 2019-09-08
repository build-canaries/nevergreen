import {Actions} from '../Actions'
import {Request} from 'superagent'
import {Project} from '../domain/Project'
import {Action} from 'redux'

export interface ActionInterestingProjectsFetching extends Action<Actions.INTERESTING_PROJECTS_FETCHING> {
  readonly request: Request;
}

export interface ActionInterestingProjects extends Action<Actions.INTERESTING_PROJECTS> {
  readonly projects: ReadonlyArray<Project>;
  readonly errors: ReadonlyArray<string>;
}

export function interestingProjectsFetching(request: Request): ActionInterestingProjectsFetching {
  return {type: Actions.INTERESTING_PROJECTS_FETCHING, request}
}

export function interestingProjects(projects: Project[], errors: string[]): ActionInterestingProjects {
  return {
    type: Actions.INTERESTING_PROJECTS,
    projects,
    errors
  }
}
