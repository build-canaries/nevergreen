import {isBlank, isNumber} from '../common/Utils'
import {ApiProject} from '../gateways/ProjectsGateway'

export enum Prognosis {
  healthy = 'healthy',
  sick = 'sick',
  healthyBuilding = 'healthy-building',
  sickBuilding = 'sick-building',
  unknown = 'unknown'
}

export interface Project {
  readonly fetchedTime: string;
  readonly isNew: boolean;
  readonly lastBuildLabel: string;
  readonly lastBuildStatus: string;
  readonly lastBuildTime?: string | null;
  readonly name: string;
  readonly prognosis: Prognosis;
  readonly projectId: string;
  readonly removed: boolean;
  readonly serverType: string;
  readonly stage?: string | null;
  readonly thisBuildTime?: string;
  readonly trayId: string;
  readonly url: string;
}

export interface ProjectError {
  readonly errorMessage: string;
  readonly fetchedTime: string;
  readonly trayId: string;
  readonly url: string;
}

export function formatBuildLabel(buildLabel?: string) {
  if (buildLabel && !isBlank(buildLabel)) {
    return isNumber(buildLabel)
      ? `#${buildLabel}`
      : buildLabel
  }

  return ''
}

export function projectDescription({name, stage}: Project) {
  if (isBlank(stage)) {
    return name
  } else {
    return `${name} ${stage}`
  }
}

export function isSick(prognosis: Prognosis) {
  return prognosis === Prognosis.sick
}

export function isBuilding(prognosis: Prognosis) {
  return prognosis === Prognosis.healthyBuilding || prognosis === Prognosis.sickBuilding
}

export function createProject(projectId: string, name: string, additional: Partial<Project> = {}): Project {
  return {
    fetchedTime: '',
    isNew: true,
    lastBuildLabel: '',
    lastBuildStatus: '',
    lastBuildTime: '',
    name,
    prognosis: Prognosis.unknown,
    projectId,
    removed: false,
    serverType: '',
    stage: '',
    thisBuildTime: undefined,
    trayId: '',
    url: '',
    ...additional
  }
}

export function createProjectError(errorMessage: string, additional: Partial<ProjectError> = {}): ProjectError {
  return {
    errorMessage,
    fetchedTime: '',
    trayId: '',
    url: '',
    ...additional
  }
}

export function wrapProjects(apiProjects: ReadonlyArray<ApiProject>): ReadonlyArray<Project> {
  return apiProjects
    .filter((apiProject) => !apiProject.isError)
    .filter((apiProject) => !apiProject.job)
    .map((apiProject) => createProject(apiProject.projectId, apiProject.name, apiProject))
}

export function wrapProjectErrors(apiProjects: ReadonlyArray<ApiProject>): ReadonlyArray<ProjectError> {
  return apiProjects
    .filter((apiProject) => apiProject.isError)
    .map((apiProject) => {
      return createProjectError(apiProject.errorMessage || 'unknown', {
        fetchedTime: apiProject.fetchedTime,
        trayId: apiProject.trayId,
        url: apiProject.webUrl
      })
    })
}
