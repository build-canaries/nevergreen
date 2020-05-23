import {isBlank, isNumeric} from '../common/Utils'

export enum Prognosis {
  healthy = 'healthy',
  sick = 'sick',
  healthyBuilding = 'healthy-building',
  sickBuilding = 'sick-building',
  unknown = 'unknown',
  error = 'error'
}

export type ProjectPrognosis = Exclude<Prognosis, Prognosis.error>

export interface ProjectError {
  readonly description: string;
  readonly prognosis: Prognosis.error;
  readonly timestamp: string;
  readonly trayId?: string;
  readonly webUrl: string;
}

export interface Project {
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

export type Projects = ReadonlyArray<Project | ProjectError>

function formatBuildLabel(buildLabel?: string) {
  if (buildLabel && !isBlank(buildLabel)) {
    return isNumeric(buildLabel)
      ? `#${buildLabel}`
      : buildLabel
  }

  return ''
}

export function isError(project: Project | ProjectError): project is ProjectError {
  return project.prognosis === Prognosis.error
}

export function isSick(project: Project | ProjectError): project is Project {
  return project.prognosis === Prognosis.sick
}

export function isBuilding(project: Project | ProjectError): project is Project {
  return project.prognosis === Prognosis.healthyBuilding || project.prognosis === Prognosis.sickBuilding
}

export function projectIdentifier(project: Project | ProjectError): string {
  return isError(project)
    ? project.webUrl
    : `${project.trayId}#${project.projectId}`
}

export function projectBuildLabel(project: Project | ProjectError): string {
  if (isError(project) || isBuilding(project)) {
    return ''
  }
  return formatBuildLabel((project as Project).lastBuildLabel)
}

function sameProject(previousProject: Project, currentProject: Project) {
  return previousProject.projectId === currentProject.projectId
}

function sameError(previousProject: ProjectError, currentProject: ProjectError) {
  return previousProject.webUrl === currentProject.webUrl
}

function sameBuild(previousProject: Project, currentProject: Project) {
  return previousProject.lastBuildLabel === currentProject.lastBuildLabel
}

function updateTimestamp(project: Project | ProjectError, previouslyFetchedProjects: Projects): Project | ProjectError {
  if (isBuilding(project)) {
    const previousProject = previouslyFetchedProjects
      .filter((previous): previous is Project => !isError(previous))
      .find((previous) => sameProject(project, previous))
    if (previousProject && isBuilding(previousProject) && sameBuild(previousProject, project)) {
      return {...project, timestamp: previousProject.timestamp}
    }
  } else if (isError(project)) {
    const previousError = previouslyFetchedProjects
      .filter((previous): previous is ProjectError => isError(previous))
      .find((previous) => sameError(project, previous))
    if (previousError) {
      return {...project, timestamp: previousError.timestamp}
    }
  }
  return project
}

export function updateProjects(apiProjects: Projects, previouslyFetchedProjects: Projects): Projects {
  return apiProjects
    .map((project) => updateTimestamp(project, previouslyFetchedProjects))
}
