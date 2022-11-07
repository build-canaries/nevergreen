import {Actions} from '../../Actions'
import {
  ActionAddNotification,
  ActionAllowAudioNotifications,
  ActionAllowSystemNotifications,
  ActionRemoveNotification
} from './NotificationsActionCreators'
import defaultSoundFx from './pacman_death.mp3'
import {createReducer, createSelector} from '@reduxjs/toolkit'
import {State} from '../../Reducer'
import get from 'lodash/get'
import {ActionConfigurationImported} from '../backup/BackupActionCreators'
import {Prognosis} from '../../domain/Project'

export interface NotificationsState {
  readonly allowAudioNotifications: boolean;
  readonly allowSystemNotifications: boolean;
  readonly enableNewVersionCheck: boolean;
  readonly notifications: {
    [Prognosis.error]?: NotificationDetails;
    [Prognosis.sick]?: NotificationDetails;
    [Prognosis.sickBuilding]?: NotificationDetails;
    [Prognosis.healthy]?: NotificationDetails;
    [Prognosis.healthyBuilding]?: NotificationDetails;
    [Prognosis.unknown]?: NotificationDetails;
  };
}

export interface NotificationDetails {
  readonly systemNotification: boolean;
  readonly sfx: string;
}

export const NOTIFICATIONS_ROOT = 'notifications'

const defaultState: NotificationsState = {
  allowAudioNotifications: false,
  allowSystemNotifications: false,
  enableNewVersionCheck: true,
  notifications: {
    [Prognosis.sick]: {systemNotification: false, sfx: defaultSoundFx}
  }
}

export const reduce = createReducer<NotificationsState>(defaultState, (builder) => {
  builder
    .addCase(Actions.CONFIGURATION_IMPORTED, (draft, action: ActionConfigurationImported) => {
      const importedState = get(action.configuration, NOTIFICATIONS_ROOT, {}) as NotificationsState
      return {...draft, ...importedState}
    })
    .addCase(Actions.TOGGLE_VERSION_CHECK, (draft) => {
      draft.enableNewVersionCheck = !draft.enableNewVersionCheck
    })
    .addCase(Actions.ALLOW_AUDIO_NOTIFICATIONS, (draft, action: ActionAllowAudioNotifications) => {
      draft.allowAudioNotifications = action.value
    })
    .addCase(Actions.ALLOW_SYSTEM_NOTIFICATIONS, (draft, action: ActionAllowSystemNotifications) => {
      draft.allowSystemNotifications = action.value
    })
    .addCase(Actions.ADD_NOTIFICATION, (draft, action: ActionAddNotification) => {
      draft.notifications[action.prognosis] = {systemNotification: action.systemNotification, sfx: action.sfx}
    })
    .addCase(Actions.REMOVE_NOTIFICATION, (draft, action: ActionRemoveNotification) => {
      delete draft.notifications[action.prognosis]
    })
})

function getNotificationsRoot(state: State) {
  return state[NOTIFICATIONS_ROOT]
}

export const getToggleVersionCheck = createSelector(getNotificationsRoot, (settings) => settings.enableNewVersionCheck)
export const getAllowAudioNotifications = createSelector(getNotificationsRoot, (settings) => settings.allowAudioNotifications)
export const getAllowSystemNotifications = createSelector(getNotificationsRoot, (settings) => settings.allowSystemNotifications)
export const getNotifications = createSelector(getNotificationsRoot, (settings) => settings.notifications)
