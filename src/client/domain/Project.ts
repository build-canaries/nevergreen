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

export function formatBuildLabel(buildLabel?: string, maxLength = 10) {
  if (buildLabel && !isBlank(buildLabel)) {
    return isNumber(buildLabel)
      ? `#${buildLabel}`
      : buildLabel.substr(0, maxLength)
  }

  return ''
}

export function isSick(prognosis: Prognosis) {
  return prognosis === Prognosis.sick
}

export function isBuilding(prognosis: Prognosis) {
  return prognosis === Prognosis.healthyBuilding || prognosis === Prognosis.sickBuilding
}

export function wrapProjects(apiProjects: ApiProject[]): Project[] {
  return apiProjects
    .filter((apiProject) => !apiProject.isError)
    .filter((apiProject) => !apiProject.job)
    .map((apiProject) => {
      return {
        fetchedTime: apiProject.fetchedTime,
        isNew: apiProject.isNew,
        lastBuildLabel: apiProject.lastBuildLabel,
        lastBuildStatus: apiProject.lastBuildStatus,
        lastBuildTime: apiProject.lastBuildTime,
        name: apiProject.name,
        prognosis: apiProject.prognosis,
        projectId: apiProject.projectId,
        removed: false,
        serverType: apiProject.serverType,
        stage: apiProject.stage,
        thisBuildTime: undefined,
        trayId: apiProject.trayId,
        url: apiProject.webUrl
      }
    })
}

export function wrapProjectErrors(apiProjects: ApiProject[]): ProjectError[] {
  return apiProjects
    .filter((apiProject) => apiProject.isError)
    .map((apiProject) => {
      return {
        errorMessage: apiProject.errorMessage || 'unknown',
        fetchedTime: apiProject.fetchedTime,
        trayId: apiProject.trayId,
        url: apiProject.webUrl
      }
    })
}
