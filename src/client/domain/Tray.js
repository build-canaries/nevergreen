import _ from 'lodash'
import nameGenerator from 'project-name-generator'
import {hash, Record} from 'immutable'
import {isSick} from './Project'
import uuid from 'uuid/v4'

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
  return _.lowerCase(nameGenerator().spaced)
}

export function createId() {
  return uuid()
}

export function sickProjects(projects) {
  return projects.filter((project) => isSick(project.prognosis))
}

export class Tray extends Record({
  trayId: '',
  name: '',
  url: '',
  username: '',
  password: '',
  serverType: '',
  timestamp: null,
  loaded: false,
  highlight: false,
  errors: null,
  requiresRefresh: false,
  includeNew: true
}, 'Tray') {

  equals(other) {
    return other && other.trayId === this.trayId
  }

  hashCode() {
    return hash(this.trayId)
  }
}
