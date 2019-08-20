import validateConfiguration from './ValidateConfiguration'
import {cloneDeep, isString} from 'lodash'
import {RecursivePartial} from '../common/Types'
import {State} from '../Reducer'
import {fromJson} from '../common/Json'

export interface Configuration extends RecursivePartial<State> {
}

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
    return validateConfiguration.errors.map((error) => `${error.dataPath} ${error.message}`)
  }
}

export function filter(data: string | object): Configuration {
  const filteredConfiguration = isString(data)
    ? fromJson(data)
    : cloneDeep(data)
  validateConfiguration(filteredConfiguration)
  return filteredConfiguration
}

export function toConfiguration(data: string | object): [string[], Configuration | undefined] {
  try {
    const configuration = filter(data)
    const validationMessages = validate(configuration)
    return [validationMessages, configuration]
  } catch (error) {
    return [[error.message], undefined]
  }
}
