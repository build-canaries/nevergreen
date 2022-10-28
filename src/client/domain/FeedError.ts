import {errorMessage} from '../common/Utils'
import {now} from '../common/DateTime'
import {FeedApiError, ProjectApi, ProjectsResponse} from '../gateways/ProjectsGateway'
import {Prognosis} from './Project'

export interface FeedError extends FeedApiError {
  readonly previousPrognosis: Prognosis.error | undefined;
}

export type FeedErrors = ReadonlyArray<FeedError>

export function toFeedApiError(e: unknown): FeedApiError {
  return {
    description: errorMessage(e),
    prognosis: Prognosis.error,
    timestamp: now(),
    webUrl: '',
    trayId: ''
  }
}

export function isError<P extends ProjectApi, E extends FeedApiError>(project: P | E): project is E {
  return project.prognosis === Prognosis.error
}

function sameError(previousProject: FeedApiError, currentProject: FeedApiError) {
  return previousProject.webUrl === currentProject.webUrl
}

function updateTimestamp(error: FeedError, previousErrors: FeedErrors): FeedError {
  const previousError = previousErrors
    .find((previous) => sameError(error, previous))
  if (previousError) {
    return {...error, timestamp: previousError.timestamp}
  }
  return error
}

function addPreviousPrognosis(error: FeedApiError, previousErrors: FeedErrors): FeedError {
  const previousPrognosis = previousErrors
    .find((previous) => sameError(previous, error))
    ?.prognosis
  return {
    ...error,
    previousPrognosis
  }
}

export function enrichErrors(apiProjects: ProjectsResponse, previouslyErrors: FeedErrors): FeedErrors {
  return apiProjects
    .filter(isError)
    .map((project) => addPreviousPrognosis(project, previouslyErrors))
    .map((project) => updateTimestamp(project, previouslyErrors))
}
