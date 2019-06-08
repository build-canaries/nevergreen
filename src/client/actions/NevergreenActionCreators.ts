import {Actions} from './Actions'
import {Action} from 'redux'
import {Configuration} from '../reducers/Configuration'

export interface ActionInitalising extends Action<Actions.INITIALISING> {
}

export interface ActionNavigated extends Action<Actions.NAVIGATED> {
}

export interface ActionFullScreen extends Action<Actions.FULL_SCREEN> {
  readonly enabled: boolean;
}

export interface ActionRequestFullScreen extends Action<Actions.REQUEST_FULL_SCREEN> {
  readonly requested: boolean;
}

export interface ActionAbortPendingRequest extends Action<Actions.ABORT_PENDING_REQUEST> {
  readonly id: string;
}

export interface ActionSetConfiguration extends Action<Actions.SET_CONFIGURATION> {
  readonly configuration: Configuration;
}

export function initalising(): ActionInitalising {
  return {type: Actions.INITIALISING}
}

export function navigated(): ActionNavigated {
  return {type: Actions.NAVIGATED}
}

export function enableFullScreen(enabled: boolean): ActionFullScreen {
  return {type: Actions.FULL_SCREEN, enabled}
}

export function requestFullScreen(requested: boolean): ActionRequestFullScreen {
  return {type: Actions.REQUEST_FULL_SCREEN, requested}
}

export function setConfiguration(configuration: Configuration): ActionSetConfiguration {
  return {type: Actions.SET_CONFIGURATION, configuration}
}
