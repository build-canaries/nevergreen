import nameGenerator from 'project-name-generator'
import uuid from 'uuid/v4'
import {isSick, Project} from './Project'
import {lowerCase} from 'lodash'

export enum AuthTypes {
  none = 'none',
  basic = 'basic',
  token = 'token'
}

interface NoAuth {
  readonly type: AuthTypes.none;
}

interface BasicAuth {
  readonly type: AuthTypes.basic;
  readonly username: string;
  readonly password: string;
}

interface TokenAuth {
  readonly type: AuthTypes.token;
  readonly accessToken: string;
}

export type AuthDetails = NoAuth | BasicAuth | TokenAuth

export interface Tray {
  readonly authType: AuthTypes;
  readonly errors: ReadonlyArray<string>;
  readonly highlight: boolean;
  readonly includeNew: boolean;
  readonly loaded: boolean;
  readonly name?: string;
  readonly password?: string;
  readonly accessToken?: string;
  readonly requiresRefresh: boolean;
  readonly serverType: string;
  readonly timestamp?: string;
  readonly trayId: string;
  readonly url: string;
  readonly username?: string;
}

export const CI_OPTIONS = [
  {value: '', display: 'Auto detect'},
  {value: 'circle', display: 'CircleCI'},
  {value: 'cruise-control', display: 'CruiseControl'},
  {value: 'cruise-control-net', display: 'CruiseControl.net'},
  {value: 'cruise-control-rb', display: 'CruiseControl.rb'},
  {value: 'go', display: 'GoCD'},
  {value: 'hudson', display: 'Hudson'},
  {value: 'jenkins', display: 'Jenkins'},
  {value: 'solano', display: 'Solano CI'},
  {value: 'team-city', display: 'TeamCity'},
  {value: 'travis', display: 'Travis CI'}
]

export function generateRandomName() {
  return lowerCase(nameGenerator().spaced)
}

export function createId() {
  return uuid()
}

export function sickProjects(projects: ReadonlyArray<Project>) {
  return projects.filter((project) => isSick(project.prognosis))
}
