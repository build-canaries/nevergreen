import {isBlank, isNumber} from '../common/Utils'
import {ApiError, ApiProject, isApiError, isApiProject, ProjectsResponse} from '../gateways/ProjectsGateway'

export enum Prognosis {
  healthy = 'healthy',
  sick = 'sick',
  healthyBuilding = 'healthy-building',
  sickBuilding = 'sick-building',
  unknown = 'unknown',
  error = 'error'
}

export interface Project {
  readonly description: string;
  readonly isNew: boolean;
  readonly lastBuildLabel: string;
  readonly prognosis: Prognosis;
  readonly projectId: string;
  readonly removed: boolean;
  readonly serverType: string;
  readonly timestamp: string;
  readonly trayId: string;
  readonly webUrl: string;
}

export interface ProjectError {
  readonly description: string;
  readonly timestamp: string;
  readonly trayId: string;
}

function formatBuildLabel(buildLabel?: string) {
  if (buildLabel && !isBlank(buildLabel)) {
    return isNumber(buildLabel)
      ? `#${buildLabel}`
      : buildLabel
  }

  return ''
}

export function isSick({prognosis}: Project) {
  return prognosis === Prognosis.sick
}

export function isBuilding({prognosis}: Project | ApiProject) {
  return prognosis === Prognosis.healthyBuilding || prognosis === Prognosis.sickBuilding
}

export function projectBuildLabel(project: Project) {
  return isBuilding(project) ? '' : formatBuildLabel(project.lastBuildLabel)
}

export function createProject(apiProject: ApiProject): Project {
  return {
    isNew: apiProject.isNew,
    lastBuildLabel: apiProject.lastBuildLabel,
    description: apiProject.description,
    prognosis: apiProject.prognosis || Prognosis.unknown,
    projectId: apiProject.projectId,
    removed: false,
    serverType: apiProject.serverType,
    timestamp: apiProject.timestamp,
    trayId: apiProject.trayId,
    webUrl: apiProject.webUrl
  }
}

export function createProjectError(apiProject: ApiError): ProjectError {
  return {
    description: apiProject.description,
    timestamp: apiProject.timestamp,
    trayId: apiProject.trayId || ''
  }
}

function sameBuild(previousProject: Project, currentProject: Project) {
  return previousProject.lastBuildLabel === currentProject.lastBuildLabel
}

function updateTimestamp(project: Project, previouslyFetchedProjects: ReadonlyArray<Project>): Project {
  if (isBuilding(project)) {
    const previousProject = previouslyFetchedProjects.find((previous) => project.projectId === previous.projectId)
    if (previousProject && isBuilding(previousProject) && sameBuild(previousProject, project)) {
      return {...project, timestamp: previousProject.timestamp}
    }
  }
  return project
}

export function wrapProjects(apiProjects: ProjectsResponse, previouslyFetchedProjects: ReadonlyArray<Project>): ReadonlyArray<Project> {
  return apiProjects
    .filter(isApiProject)
    .map(createProject)
    .map((project) => updateTimestamp(project, previouslyFetchedProjects))
}

export function wrapProjectErrors(apiProjects: ProjectsResponse): ReadonlyArray<ProjectError> {
  return apiProjects
    .filter(isApiError)
    .map(createProjectError)
}
