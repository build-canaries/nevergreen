import validateSchema from './ValidateSchema'
import _ from 'lodash'

export const schema = validateSchema.schema

/*
 * ValidateSchema is generated using ajv-pack, the main export is a validate function which mutates the given data
 * structure (to remove additional properties). Because of this we deep clone the given object before passing to the
 * validate function for safety.
 */

export function validate(data) {
  const filteredData = _.cloneDeep(data)
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
