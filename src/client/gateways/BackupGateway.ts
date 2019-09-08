import {BackupLocation} from '../backup/BackupActionCreators'
import {post} from './Gateway'
import {Configuration} from '../configuration/Configuration'

export interface ExportResponse {
  readonly id: string;
}

export interface ImportResponse {
  readonly configuration: Configuration;
  readonly description: string;
  readonly id: string;
  readonly where: BackupLocation;
}

export function exportConfiguration(where: string, id: string, description: string, configuration: string, token: string, url: string) {
  return post('/api/export', {where, id, description, configuration, token, url})
}

export function importConfiguration(from: string, id: string, token: string, url: string) {
  return post('/api/import', {from, id, token, url})
}
