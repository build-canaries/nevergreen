import {fakeRequest, post} from './Gateway'
import {Prognosis, Project} from '../domain/Project'
import {SelectedState} from '../reducers/SelectedReducer'
import {size} from 'lodash'
import {Tray} from '../domain/Tray'

export interface ApiProject {
  readonly activity: string;
  readonly errorMessage?: string;
  readonly fetchedTime: string;
  readonly isError: boolean;
  readonly job: string | null;
  readonly lastBuildLabel: string;
  readonly lastBuildStatus: string;
  readonly lastBuildTime: string | null;
  readonly messages: [];
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
  readonly included?: string[];
  readonly includeNew: boolean;
  readonly password?: string;
  readonly prognosis?: Prognosis[];
  readonly seen: string[];
  readonly serverType?: string;
  readonly trayId: string;
  readonly url: string;
  readonly username?: string;
}

function toProjectsRequest(tray: Tray, projects: Project[], selectedPerTray?: SelectedState): ProjectsRequest {
  const seen = projects
    .filter((project) => project.trayId === tray.trayId)
    .map((project) => project.projectId)

  const included = selectedPerTray
    ? selectedPerTray[tray.trayId]
    : undefined

  return {
    trayId: tray.trayId,
    url: tray.url,
    username: tray.username,
    password: tray.password,
    serverType: tray.serverType,
    includeNew: tray.includeNew,
    included,
    seen
  }
}

function hasIncludedProjects(projectsRequest: ProjectsRequest) {
  return projectsRequest.includeNew || size(projectsRequest.included) > 0
}

export function fetchAll(trays: Tray[], projects: Project[]) {
  const data = trays
    .map((tray) => toProjectsRequest(tray, projects))

  return post('/api/projects', data)
}

export function interesting(trays: Tray[], projects: Project[], selectedPerTray: SelectedState) {
  const data = trays
    .map((tray) => toProjectsRequest(tray, projects, selectedPerTray))
    .map((req) => ({
      ...req,
      prognosis: [
        Prognosis.healthyBuilding,
        Prognosis.sick,
        Prognosis.sickBuilding,
        Prognosis.unknown
      ]
    }))
    .filter(hasIncludedProjects)

  return size(data) === 0
    ? fakeRequest([])
    : post('/api/projects', data)
}
