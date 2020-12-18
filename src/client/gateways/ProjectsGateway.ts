import {fakeRequest, post, Request, ServerError} from './Gateway'
import {Prognosis, ProjectPrognosis} from '../domain/Project'
import {SelectedState} from '../tracking/SelectedReducer'
import {size} from 'lodash'
import {AuthTypes, Tray} from '../domain/Tray'
import {ProjectState} from '../tracking/ProjectsReducer'

export enum SortBy {
  default = 'default',
  description = 'description',
  prognosis = 'prognosis',
  timestamp = 'timestamp'
}

interface ProjectsRequest {
  readonly feeds: ReadonlyArray<FeedRequest>;
  readonly prognosis?: ReadonlyArray<Prognosis>;
  readonly sort?: SortBy;
}

export interface FeedRequest {
  readonly accessToken?: string;
  readonly authType: AuthTypes;
  readonly included?: ReadonlyArray<string>;
  readonly includeNew: boolean;
  readonly password?: string;
  readonly seen: ReadonlyArray<string>;
  readonly serverType?: string;
  readonly trayId: string;
  readonly url: string;
  readonly username?: string;
}

export interface ProjectError extends ServerError {
  readonly trayId: string;
}

export interface ProjectApi {
  readonly description: string;
  readonly isNew: boolean;
  readonly lastBuildLabel: string;
  readonly prognosis: ProjectPrognosis;
  readonly projectId: string;
  readonly serverType: string;
  readonly timestamp: string;
  readonly trayId: string;
  readonly webUrl: string;
}

export type ProjectsResponse = ReadonlyArray<ProjectError | ProjectApi>

function toProjectsRequest(tray: Tray, knownProjects: ReadonlyArray<ProjectState>, selectedPerTray?: SelectedState): FeedRequest {
  const seen = knownProjects
    .filter((project) => project.trayId === tray.trayId)
    .map((project) => project.projectId)

  const included = selectedPerTray
    ? selectedPerTray[tray.trayId]
    : undefined

  return {
    trayId: tray.trayId,
    url: tray.url,
    authType: tray.authType,
    username: tray.username,
    password: tray.encryptedPassword,
    accessToken: tray.encryptedAccessToken,
    serverType: tray.serverType,
    includeNew: tray.includeNew,
    included,
    seen
  }
}

function hasIncludedProjects(projectsRequest: FeedRequest) {
  return projectsRequest.includeNew || size(projectsRequest.included) > 0
}

export function fetchAll(trays: ReadonlyArray<Tray>, knownProjects: ReadonlyArray<ProjectState>): Request<ProjectsResponse> {
  const feeds = trays
    .map((tray) => toProjectsRequest(tray, knownProjects))

  const data: ProjectsRequest = {
    feeds,
    sort: SortBy.description
  }

  return post('/api/projects', data)
}

export function interesting(
  trays: ReadonlyArray<Tray>,
  knownProjects: ReadonlyArray<ProjectState>,
  selectedPerTray: SelectedState,
  prognosis: ReadonlyArray<Prognosis>,
  sort: SortBy
): Request<ProjectsResponse> {
  const feeds = trays
    .map((tray) => toProjectsRequest(tray, knownProjects, selectedPerTray))
    .filter(hasIncludedProjects)

  const data: ProjectsRequest = {
    feeds,
    prognosis,
    sort
  }

  return size(feeds) === 0
    ? fakeRequest([])
    : post('/api/projects', data)
}
