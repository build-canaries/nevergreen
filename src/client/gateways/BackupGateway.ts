import {BackupLocation} from '../actions/BackupActionCreators'
import {post} from './Gateway'
import {Configuration} from '../reducers/Configuration'

export interface ExportResponse {
  id: string;
}

export interface ImportResponse {
  configuration: Configuration;
  description: string;
  id: string;
  where: BackupLocation;
}

export function exportConfiguration(where: string, id: string, description: string, configuration: string, token: string, url: string) {
  return post('/api/export', {where, id, description, configuration, token, url})
}

export function importConfiguration(from: string, id: string, token: string, url: string) {
  return post('/api/import', {from, id, token, url})
}
