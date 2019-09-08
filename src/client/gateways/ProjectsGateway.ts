import {fakeRequest, post} from './Gateway'
import {Prognosis, Project} from '../domain/Project'
import {SelectedState} from '../tracking/SelectedReducer'
import {size} from 'lodash'
import {AuthTypes, Tray} from '../domain/Tray'

export interface ApiProject {
  readonly activity: string;
  readonly errorMessage?: string;
  readonly fetchedTime: string;
  readonly isError: boolean;
  readonly isNew: boolean;
  readonly job: string | null;
  readonly lastBuildLabel: string;
  readonly lastBuildStatus: string;
  readonly lastBuildTime: string | null;
  readonly messages: ReadonlyArray<string>;
  readonly name: string;
  readonly nextBuildTime: string;
  readonly owner: string | null;
  readonly prognosis: Prognosis;
  readonly projectId: string;
  readonly serverType: string;
  readonly stage: string | null;
  readonly trayId: string;
  readonly unnormalisedJob: string | null;
  readonly unnormalisedName: string | null;
  readonly unnormalisedOwner: string | null;
  readonly unnormalisedStage: string | null;
  readonly webUrl: string;
}

export type ProjectsResponse = ApiProject[]

interface ProjectsRequest {
  readonly included?: ReadonlyArray<string>;
  readonly includeNew: boolean;
  readonly authType: AuthTypes;
  readonly password?: string;
  readonly accessToken?: string;
  readonly prognosis?: ReadonlyArray<Prognosis>;
  readonly seen: ReadonlyArray<string>;
  readonly serverType?: string;
  readonly trayId: string;
  readonly url: string;
  readonly username?: string;
}

function toProjectsRequest(tray: Tray, projects: ReadonlyArray<Project>, selectedPerTray?: SelectedState): ProjectsRequest {
  const seen = projects
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
    password: tray.password,
    accessToken: tray.accessToken,
    serverType: tray.serverType,
    includeNew: tray.includeNew,
    included,
    seen
  }
}

function hasIncludedProjects(projectsRequest: ProjectsRequest) {
  return projectsRequest.includeNew || size(projectsRequest.included) > 0
}

export function fetchAll(trays: ReadonlyArray<Tray>, projects: ReadonlyArray<Project>) {
  const data = trays
    .map((tray) => toProjectsRequest(tray, projects))

  return post('/api/projects', data)
}

export function interesting(trays: ReadonlyArray<Tray>, projects: ReadonlyArray<Project>, selectedPerTray: SelectedState, prognosis: ReadonlyArray<Prognosis>) {
  const data = trays
    .map((tray) => toProjectsRequest(tray, projects, selectedPerTray))
    .map((req) => ({...req, prognosis}))
    .filter(hasIncludedProjects)

  return size(data) === 0
    ? fakeRequest([])
    : post('/api/projects', data)
}
