import lowerCase from 'lodash/lowerCase'
import nameGenerator from 'project-name-generator'

export function generateRandomName() {
  return lowerCase(nameGenerator().spaced)
}
