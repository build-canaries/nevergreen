import _ from 'lodash'
import nameGenerator from 'project-name-generator'

export function generateRandomName() {
  return _.lowerCase(nameGenerator().spaced)
}

export function createId(url) {
  return url
}
