import {post} from './Gateway'
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

export function exportConfiguration(location: RemoteLocation, configuration: string, signal?: AbortSignal): Promise<ExportResponse> {
  return post<ExportResponse>({
    url: '/api/export',
    data: {
      where: location.where,
      id: location.externalId,
      description: location.description,
      configuration,
      encryptedToken: location.encryptedAccessToken,
      url: location.url
    },
    signal
  })
}

export function fetchConfiguration(location: RemoteLocation, signal?: AbortSignal): Promise<ImportResponse> {
  return post<ImportResponse>({
    url: '/api/import',
    data: {
      from: location.where,
      id: location.externalId,
      encryptedToken: location.encryptedAccessToken,
      url: location.url
    },
    signal
  })
}
