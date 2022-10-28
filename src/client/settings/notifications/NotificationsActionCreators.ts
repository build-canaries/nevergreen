import {Actions} from '../../Actions'
import {Action} from 'redux'
import {Prognosis} from '../../domain/Project'

export interface ActionToggleVersionCheck extends Action<Actions.TOGGLE_VERSION_CHECK> {
}

export interface ActionAllowAudioNotifications extends Action<Actions.ALLOW_AUDIO_NOTIFICATIONS> {
  readonly value: boolean;
}

export interface ActionAllowSystemNotifications extends Action<Actions.ALLOW_SYSTEM_NOTIFICATIONS> {
  readonly value: boolean;
}

export interface ActionAddNotification extends Action<Actions.ADD_NOTIFICATION> {
  readonly prognosis: Prognosis;
  readonly systemNotification: boolean;
  readonly sfx: string;
}

export interface ActionRemoveNotification extends Action<Actions.REMOVE_NOTIFICATION> {
  readonly prognosis: Prognosis;
}

export function toggleVersionCheck(): ActionToggleVersionCheck {
  return {type: Actions.TOGGLE_VERSION_CHECK}
}

export function setAllowAudioNotifications(value: boolean): ActionAllowAudioNotifications {
  return {type: Actions.ALLOW_AUDIO_NOTIFICATIONS, value}
}

export function setAllowSystemNotifications(value: boolean): ActionAllowSystemNotifications {
  return {type: Actions.ALLOW_SYSTEM_NOTIFICATIONS, value}
}

export function addNotification(prognosis: Prognosis, systemNotification: boolean, sfx: string): ActionAddNotification {
  return {type: Actions.ADD_NOTIFICATION, prognosis, systemNotification, sfx}
}

export function removeNotification(prognosis: Prognosis): ActionRemoveNotification {
  return {type: Actions.REMOVE_NOTIFICATION, prognosis}
}
