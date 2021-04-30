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

export function exportConfiguration(location: RemoteLocation, configuration: string): Request<ExportResponse> {
  return post<ExportResponse>('/api/export', {
    where: location.where,
    id: location.externalId,
    description: location.description,
    configuration,
    encryptedToken: location.encryptedAccessToken,
    url: location.url
  })
}

export function fetchConfiguration(location: RemoteLocation): Request<ImportResponse> {
  return post<ImportResponse>('/api/import', {
    from: location.where,
    id: location.externalId,
    encryptedToken: location.encryptedAccessToken,
    url: location.url
  })
}
