import {BackupLocation} from '../backup/BackupActionCreators'
import {post} from './Gateway'
import {UntrustedData} from '../configuration/LocalRepository'
import {Request} from 'superagent'
import {RemoteLocation} from '../backup/remote/RemoteLocationsReducer'

export interface ExportResponse {
  readonly id: string;
}

export interface ImportResponse {
  readonly configuration: UntrustedData;
  readonly description: string;
  readonly id: string;
  readonly where: BackupLocation;
}

export function exportConfiguration(where: string, id: string, description: string, configuration: string, token: string, url: string): Request {
  return post('/api/export', {where, id, description, configuration, token, url})
}

export function exportConfigurationNew(location: RemoteLocation, configuration: string): Request {
  return post('/api/export', {
    where: location.where,
    id: location.externalId,
    description: location.description,
    configuration,
    encryptedToken: location.encryptedAccessToken,
    url: location.url
  })
}

export function fetchConfiguration(from: string, id: string, token: string, url: string): Request {
  return post('/api/import', {from, id, token, url})
}

export function fetchConfigurationNew(location: RemoteLocation): Request {
  return post('/api/import', {
    from: location.where,
    id: location.externalId,
    encryptedToken: location.encryptedAccessToken,
    url: location.url
  })
}
