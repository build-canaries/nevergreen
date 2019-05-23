import {fakeRequest, post} from './Gateway'
import {Prognosis} from '../domain/Project'
import {ProjectsState} from '../reducers/ProjectsReducer'
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

interface TrayRequest {
  readonly included?: string[];
  readonly includeNew: boolean;
  readonly password?: string;
  readonly seen: string[];
  readonly serverType?: string;
  readonly trayId: string;
  readonly url: string;
  readonly username?: string;
}

function toTrayRequest(tray: Tray, projectsPerTray: ProjectsState, selectedPerTray?: SelectedState): TrayRequest {
  const projects = Object.values(projectsPerTray[tray.trayId])
  const seen = projects.map((project) => project.projectId)

  const included = selectedPerTray ? selectedPerTray[tray.trayId] : undefined

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

function hasIncludedProjects(trayRequest: TrayRequest) {
  return trayRequest.includeNew || size(trayRequest.included) > 0
}

export function fetchAll(trays: Tray[], projects: ProjectsState) {
  const data = trays
    .map((tray) => toTrayRequest(tray, projects))

  return post('/api/projects/all', data)
}

export function interesting(trays: Tray[], selectedPerTray: SelectedState, projectsPerTray: ProjectsState) {
  const data = trays
    .map((tray) => toTrayRequest(tray, projectsPerTray, selectedPerTray))
    .filter(hasIncludedProjects)

  return size(data) === 0
    ? fakeRequest([])
    : post('/api/projects/interesting', data)
}
