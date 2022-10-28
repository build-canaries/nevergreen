import {isBlank, isNumeric} from '../common/Utils'
import {FeedApiError, ProjectApi, ProjectsResponse} from '../gateways/ProjectsGateway'
import {FeedError, isError} from './FeedError'

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

export type Projects = ReadonlyArray<Project>

function formatBuildLabel(buildLabel?: string) {
  if (buildLabel && !isBlank(buildLabel)) {
    return isNumeric(buildLabel)
      ? `#${buildLabel}`
      : buildLabel
  }

  return ''
}

function isBuilding(project: Project): boolean {
  return project.prognosis === Prognosis.healthyBuilding || project.prognosis === Prognosis.sickBuilding
}

function sameProject(previousProject: Project, currentProject: ProjectApi): boolean {
  return previousProject.projectId === currentProject.projectId
}

function sameBuild(previousProject: ProjectApi, currentProject: ProjectApi) {
  return previousProject.lastBuildLabel === currentProject.lastBuildLabel
}

export function isProject<P extends ProjectApi, E extends FeedApiError>(project: P | E): project is P {
  return project.prognosis !== Prognosis.error
}

export function projectIdentifier(project: Project | FeedError): string {
  return isError(project)
    ? project.webUrl
    : `${project.trayId}#${project.projectId}`
}

export function projectBuildLabel(project: Project | FeedError): string {
  if (isError(project) || isBuilding(project)) {
    return ''
  }
  return formatBuildLabel(project.lastBuildLabel)
}

function updateTimestamp(project: Project, previouslyFetchedProjects: Projects): Project {
  if (isBuilding(project)) {
    const previousProject = previouslyFetchedProjects
      .find((previous) => sameProject(project, previous))
    if (previousProject && isBuilding(previousProject) && sameBuild(previousProject, project)) {
      return {...project, timestamp: previousProject.timestamp}
    }
  }
  return project
}

function addPreviousPrognosis(project: ProjectApi, previouslyFetchedProjects: Projects): Project {
  const previousPrognosis = previouslyFetchedProjects
    .find((previous) => sameProject(previous, project))
    ?.prognosis
  return {
    ...project,
    previousPrognosis
  }
}

export function enrichProjects(apiProjects: ProjectsResponse, previouslyFetchedProjects: Projects): Projects {
  return apiProjects
    .filter(isProject)
    .map((project) => addPreviousPrognosis(project, previouslyFetchedProjects))
    .map((project) => updateTimestamp(project, previouslyFetchedProjects))
}

export function prognosisDisplay(prognosis: Prognosis): string {
  return prognosis.replace('-', ' ')
}
