import {Actions} from './Actions'
import {Action} from 'redux'
import {Configuration} from '../reducers/Configuration'

export interface ActionInitalising extends Action<Actions.INITIALISING> {
}

export interface ActionInitalised extends Action<Actions.INITIALISED> {
  readonly data: Configuration;
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

export function initalising(): ActionInitalising {
  return {type: Actions.INITIALISING}
}

export function initalised(configuration: Configuration): ActionInitalised {
  return {type: Actions.INITIALISED, data: configuration}
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
