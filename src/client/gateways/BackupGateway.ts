import {post, Request} from './Gateway'
import {RemoteLocation} from '../settings/backup/RemoteLocationsReducer'
import {RemoteLocationOptions} from '../settings/backup/RemoteLocationOptions'

export interface ExportResponse {
  readonly id: string;
}

export interface ImportResponse {
  readonly configuration: string;
  readonly description: string;
  readonly id: string;
  readonly where: RemoteLocationOptions;
}

export function exportConfiguration(where: string, id: string, description: string, configuration: string, token: string, url: string): Request<ExportResponse> {
  return post<ExportResponse>('/api/export', {where, id, description, configuration, token, url})
}

export function exportConfigurationNew(location: RemoteLocation, configuration: string): Request<ExportResponse> {
  return post<ExportResponse>('/api/export', {
    where: location.where,
    id: location.externalId,
    description: location.description,
    configuration,
    encryptedToken: location.encryptedAccessToken,
    url: location.url
  })
}

export function fetchConfiguration(from: string, id: string, token: string, url: string): Request<ImportResponse> {
  return post<ImportResponse>('/api/import', {from, id, token, url})
}

export function fetchConfigurationNew(location: RemoteLocation): Request<ImportResponse> {
  return post<ImportResponse>('/api/import', {
    from: location.where,
    id: location.externalId,
    encryptedToken: location.encryptedAccessToken,
    url: location.url
  })
}
