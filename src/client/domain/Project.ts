import {isBlank, isNumber} from '../common/Utils'
import {ApiProject} from '../gateways/ProjectsGateway'
import {omit} from 'lodash'

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

function formatBuildLabel(buildLabel?: string) {
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

export function isSick({prognosis}: Project) {
  return prognosis === Prognosis.sick
}

export function isBuilding({prognosis}: Project) {
  return prognosis === Prognosis.healthyBuilding || prognosis === Prognosis.sickBuilding
}

export function projectTimestamp(project: Project) {
  return isBuilding(project) ? project.thisBuildTime : project.lastBuildTime
}

export function projectBuildLabel(project: Project) {
  return isBuilding(project) ? '' : formatBuildLabel(project.lastBuildLabel)
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

function sameBuild(previousProject: Project, currentProject: Project) {
  return previousProject.lastBuildLabel === currentProject.lastBuildLabel
}

function addThisBuildTime(project: Project, previouslyFetchedProjects: ReadonlyArray<Project>): Project {
  if (isBuilding(project)) {
    const previousProject = previouslyFetchedProjects.find((previous) => project.projectId === previous.projectId)
    const thisBuildTime = previousProject && isBuilding(previousProject) && sameBuild(previousProject, project)
      ? previousProject.thisBuildTime
      : project.fetchedTime
    return {...project, thisBuildTime}
  } else {
    return omit(project, 'thisBuildTime')
  }
}

export function wrapProjects(apiProjects: ReadonlyArray<ApiProject>, previouslyFetchedProjects: ReadonlyArray<Project>): ReadonlyArray<Project> {
  return apiProjects
    .filter((apiProject) => !apiProject.isError)
    .filter((apiProject) => !apiProject.job)
    .map((apiProject) => createProject(apiProject.projectId, apiProject.name, apiProject))
    .map((project) => addThisBuildTime(project, previouslyFetchedProjects))
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
