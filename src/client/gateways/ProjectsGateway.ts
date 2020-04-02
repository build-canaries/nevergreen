import {fakeRequest, post} from './Gateway'
import {Prognosis, Project} from '../domain/Project'
import {SelectedState} from '../tracking/SelectedReducer'
import {size} from 'lodash'
import {AuthTypes, Tray} from '../domain/Tray'

export interface ApiError {
  readonly description: string;
  readonly prognosis: Prognosis.error;
  readonly timestamp: string;
  readonly trayId?: string;
  readonly webUrl: string;
}

export interface ApiProject {
  readonly description: string;
  readonly isNew: boolean;
  readonly lastBuildLabel: string;
  readonly prognosis: Prognosis;
  readonly projectId: string;
  readonly serverType: string;
  readonly timestamp: string;
  readonly trayId: string;
  readonly webUrl: string;
}

export type ProjectsResponse = ReadonlyArray<ApiProject | ApiError>

interface ProjectsRequest {
  readonly accessToken?: string;
  readonly authType: AuthTypes;
  readonly included?: ReadonlyArray<string>;
  readonly includeNew: boolean;
  readonly password?: string;
  readonly prognosis?: ReadonlyArray<Prognosis>;
  readonly seen: ReadonlyArray<string>;
  readonly serverType?: string;
  readonly trayId: string;
  readonly url: string;
  readonly username?: string;
}

export function isApiError(data: ApiError | ApiProject): data is ApiError {
  return data.prognosis === Prognosis.error
}

export function isApiProject(data: ApiError | ApiProject): data is ApiProject {
  return data.prognosis !== Prognosis.error
}

function toProjectsRequest(tray: Tray, knownProjects: ReadonlyArray<Project>, selectedPerTray?: SelectedState): ProjectsRequest {
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

function hasIncludedProjects(projectsRequest: ProjectsRequest) {
  return projectsRequest.includeNew || size(projectsRequest.included) > 0
}

export function fetchAll(trays: ReadonlyArray<Tray>, knownProjects: ReadonlyArray<Project>) {
  const data = trays
    .map((tray) => toProjectsRequest(tray, knownProjects))

  return post('/api/projects', data)
}

export function interesting(
  trays: ReadonlyArray<Tray>,
  knownProjects: ReadonlyArray<Project>,
  selectedPerTray: SelectedState,
  prognosis: ReadonlyArray<Prognosis>
) {
  const data = trays
    .map((tray) => toProjectsRequest(tray, knownProjects, selectedPerTray))
    .map((req) => ({...req, prognosis}))
    .filter(hasIncludedProjects)

  return size(data) === 0
    ? fakeRequest([])
    : post('/api/projects', data)
}
