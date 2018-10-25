import validateConfiguration from './ValidateConfiguration'
import _ from 'lodash'
import {fromJson} from '../common/Json'

export const schema = validateConfiguration.schema

/*
 * ValidateConfiguration is generated using ajv-pack, the main export is a validate function which mutates the given
 * data structure (to remove additional properties). Because of this we deep clone the given object before passing to
 * the validate function for safety.
 */

export function validate(configuration) {
  const filteredData = _.cloneDeep(configuration)
  if (validateConfiguration(filteredData)) {
    return []
  } else {
    return validateConfiguration.errors.map((error) => `${error.dataPath} ${error.message}`)
  }
}

export function filter(configuration) {
  const filteredConfiguration = _.cloneDeep(configuration)
  validateConfiguration(filteredConfiguration)
  return filteredConfiguration
}

export function wrapConfiguration(data) {
  const configuration = _.isString(data)
    ? fromJson(data)
    : data

  return filter(configuration)
}
