import Immutable from 'immutable'
import {FULL_SCREEN, INITIALISED, INITIALISING, NAVIGATED, REQUEST_FULL_SCREEN} from './Actions'

export function initalising() {
  return {type: INITIALISING}
}

export function initalised(configuration) {
  return {type: INITIALISED, data: Immutable.fromJS(configuration)}
}

export function navigated() {
  return {type: NAVIGATED}
}

export function enableFullScreen(enabled) {
  return {type: FULL_SCREEN, enabled}
}

export function requestFullScreen(requested) {
  return {type: REQUEST_FULL_SCREEN, requested}
}
