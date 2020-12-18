import {errorMessage, isBlank, isNumeric} from '../common/Utils'
import {now} from '../common/DateTime'
import {ProjectApi, ProjectError, ProjectsResponse} from '../gateways/ProjectsGateway'

export enum Prognosis {
  healthy = 'healthy',
  sick = 'sick',
  healthyBuilding = 'healthy-building',
  sickBuilding = 'sick-building',
  unknown = 'unknown',
  error = 'error'
}

export type ProjectPrognosis = Exclude<Prognosis, Prognosis.error>

export interface Project extends ProjectApi {
  readonly previousPrognosis: ProjectPrognosis | undefined;
}

export type Projects = ReadonlyArray<Project | ProjectError>

function formatBuildLabel(buildLabel?: string) {
  if (buildLabel && !isBlank(buildLabel)) {
    return isNumeric(buildLabel)
      ? `#${buildLabel}`
      : buildLabel
  }

  return ''
}

export function toProjectError(e: unknown): ProjectError {
  return {
    description: errorMessage(e),
    prognosis: Prognosis.error,
    timestamp: now(),
    webUrl: '',
    trayId: ''
  }
}

export function isNewlySick(project: Project | ProjectError): boolean {
  return isProject(project) && isSick(project) && project.previousPrognosis !== Prognosis.sick
}

export function isNoLongerSick(project: Project | ProjectError): boolean {
  return isProject(project) && project.prognosis !== Prognosis.sick && project.previousPrognosis === Prognosis.sick
}

export function isError(project: ProjectApi | ProjectError): project is ProjectError {
  return project.prognosis === Prognosis.error
}

export function isProject<P extends ProjectApi>(project: P | ProjectError): project is P {
  return project.prognosis !== Prognosis.error
}

export function isSick(project: ProjectApi | ProjectError): boolean {
  return project.prognosis === Prognosis.sick
}

export function isBuilding(project: ProjectApi | ProjectError): boolean {
  return project.prognosis === Prognosis.healthyBuilding || project.prognosis === Prognosis.sickBuilding
}

export function projectIdentifier(project: Project | ProjectError): string {
  return isError(project)
    ? project.webUrl
    : `${project.trayId}#${project.projectId}`
}

export function projectBuildLabel(project: ProjectApi | ProjectError): string {
  if (isError(project) || isBuilding(project)) {
    return ''
  }
  return formatBuildLabel(project.lastBuildLabel)
}

export function sameProject(previousProject: ProjectApi, currentProject: ProjectApi): boolean {
  return previousProject.projectId === currentProject.projectId
}

function sameError(previousProject: ProjectError, currentProject: ProjectError) {
  return previousProject.webUrl === currentProject.webUrl
}

function sameBuild(previousProject: ProjectApi, currentProject: ProjectApi) {
  return previousProject.lastBuildLabel === currentProject.lastBuildLabel
}

function updateTimestamp(project: Project | ProjectError, previouslyFetchedProjects: Projects): Project | ProjectError {
  if (isProject(project) && isBuilding(project)) {
    const previousProject = previouslyFetchedProjects
      .filter(isProject)
      .find((previous) => sameProject(project, previous))
    if (previousProject && isBuilding(previousProject) && sameBuild(previousProject, project)) {
      return {...project, timestamp: previousProject.timestamp}
    }
  } else if (isError(project)) {
    const previousError = previouslyFetchedProjects
      .filter(isError)
      .find((previous) => sameError(project, previous))
    if (previousError) {
      return {...project, timestamp: previousError.timestamp}
    }
  }
  return project
}

function addPreviousPrognosis(project: ProjectApi | ProjectError, previouslyFetchedProjects: Projects): Project | ProjectError {
  if (isError(project)) {
    return project
  } else {
    return {
      ...project,
      previousPrognosis: previouslyFetchedProjects
        .filter(isProject)
        .find((previous) => sameProject(previous, project))?.prognosis
    }
  }
}

export function enrichProjects(apiProjects: ProjectsResponse, previouslyFetchedProjects: Projects): Projects {
  return apiProjects
    .map((project) => addPreviousPrognosis(project, previouslyFetchedProjects))
    .map((project) => updateTimestamp(project, previouslyFetchedProjects))
}
