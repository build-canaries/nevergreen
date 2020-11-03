import {Actions} from '../Actions'
import {Action} from 'redux'
import {Configuration} from '../configuration/Configuration'

export interface ActionConfigurationImported extends Action<Actions.CONFIGURATION_IMPORTED> {
  readonly configuration: Configuration;
}

export function configurationImported(configuration: Configuration): ActionConfigurationImported {
  return {type: Actions.CONFIGURATION_IMPORTED, configuration}
}
