import {Actions} from '../../Actions'
import {Action} from 'redux'
import {Configuration} from '../../configuration/Configuration'
import {RemoteLocation} from './RemoteLocationsReducer'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import {createId} from '../../domain/Tray'
import {now} from '../../common/DateTime'

export interface ActionConfigurationImported extends Action<Actions.CONFIGURATION_IMPORTED> {
  readonly configuration: Configuration;
}

export interface ActionAddBackup extends Action<Actions.ADD_BACKUP> {
  readonly data: RemoteLocation;
}

export interface ActionSetAutomaticExport extends Action<Actions.BACKUP_SET_AUTOMATIC_EXPORT> {
  readonly internalId: string;
  readonly value: boolean;
}

export interface ActionBackupExported extends Action<Actions.BACKUP_EXPORTED> {
  readonly internalId: string;
  readonly externalId: string;
  readonly timestamp: string;
}

export interface ActionBackupImported extends Action<Actions.BACKUP_IMPORTED> {
  readonly internalId: string;
  readonly timestamp: string;
}

export interface ActionRemoveBackup extends Action<Actions.BACKUP_REMOVE> {
  readonly internalId: string;
}

export function configurationImported(configuration: Configuration): ActionConfigurationImported {
  return {type: Actions.CONFIGURATION_IMPORTED, configuration}
}


export function addBackupCustomServer(url: string): ActionAddBackup {
  return {
    type: Actions.ADD_BACKUP,
    data: {
      where: RemoteLocationOptions.Custom,
      internalId: createId(),
      url,
      automaticallyExport: false,
      exportTimestamp: '',
      importTimestamp: '',
      externalId: '',
      encryptedAccessToken: '',
      description: ''
    }
  }
}

export function addBackupGitHubLab(where: RemoteLocationOptions.GitHub | RemoteLocationOptions.GitLab, externalId: string, url: string, description: string, encryptedAccessToken: string): ActionAddBackup {
  return {
    type: Actions.ADD_BACKUP,
    data: {
      where,
      internalId: createId(),
      url,
      description,
      encryptedAccessToken,
      automaticallyExport: false,
      externalId,
      exportTimestamp: '',
      importTimestamp: ''
    }
  }
}

export function setAutomaticExport(internalId: string, value: boolean): ActionSetAutomaticExport {
  return {type: Actions.BACKUP_SET_AUTOMATIC_EXPORT, internalId, value}
}

export function backupExported(internalId: string, externalId: string): ActionBackupExported {
  return {
    type: Actions.BACKUP_EXPORTED,
    internalId,
    externalId,
    timestamp: now()
  }
}

export function backupImported(internalId: string): ActionBackupImported {
  return {
    type: Actions.BACKUP_IMPORTED,
    internalId,
    timestamp: now()
  }
}

export function removeBackup(internalId: string): ActionRemoveBackup {
  return {type: Actions.BACKUP_REMOVE, internalId}
}
