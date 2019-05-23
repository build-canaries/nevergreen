import validateConfiguration from './ValidateConfiguration'
import {cloneDeep, isString} from 'lodash'
import {RecursivePartial} from '../common/Types'
import {State} from './Reducer'
import {fromJson} from '../common/Json'

export interface Configuration extends RecursivePartial<State> {
}

// @ts-ignore
export const schema: object = validateConfiguration.schema

/*
 * ValidateConfiguration is generated using ajv-pack, the main export is a validate function which mutates the given
 * data structure (to remove additional properties). Because of this we deep clone the given object before passing to
 * the validate function for safety.
 */

export function validate(configuration: Configuration): string[] {
  const filteredData = cloneDeep(configuration)
  if (validateConfiguration(filteredData)) {
    return []
  } else {
    // @ts-ignore
    return validateConfiguration.errors.map((error) => `${error.dataPath} ${error.message}`)
  }
}

export function filter(configuration: string | object): Configuration {
  const filteredConfiguration = isString(configuration)
    ? fromJson(configuration)
    : cloneDeep(configuration)
  validateConfiguration(filteredConfiguration)
  return filteredConfiguration
}
