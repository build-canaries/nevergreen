import _ from 'lodash'
import nameGenerator from 'project-name-generator'
import {hash, Record} from 'immutable'
import {isSick} from './Project'
import uuid from 'uuid/v4'

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
  errors: null
}, 'Tray') {

  equals(other) {
    return other && other.trayId === this.trayId
  }

  hashCode() {
    return hash(this.trayId)
  }
}
