import {Actions} from './Actions'
import {Action} from 'redux'
import {Configuration} from './configuration/Configuration'

export interface ActionSetConfiguration extends Action<Actions.SET_CONFIGURATION> {
  readonly configuration: Configuration;
}

export function setConfiguration(configuration: Configuration): ActionSetConfiguration {
  return {type: Actions.SET_CONFIGURATION, configuration}
}
