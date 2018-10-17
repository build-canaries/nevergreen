import validateSchema from './ValidateSchema'
import _ from 'lodash'
import {fromJson} from '../Json'
import {migrate} from './Migrations'

export const schema = validateSchema.schema

/*
 * ValidateSchema is generated using ajv-pack, the main export is a validate function which mutates the given data
 * structure (to remove additional properties). Because of this we deep clone the given object before passing to the
 * validate function for safety.
 */

export function validate(configuration) {
  const filteredData = _.cloneDeep(configuration)
  if (validateSchema(filteredData)) {
    return []
  } else {
    return validateSchema.errors.map((error) => `${error.dataPath} ${error.message}`)
  }
}

export function filter(data) {
  const filteredData = _.cloneDeep(data)
  validateSchema(filteredData)
  return filteredData
}

export function wrapConfiguration(data) {
  const configuration = _.isString(data)
    ? fromJson(data)
    : data

  return filter(migrate(configuration))
}
