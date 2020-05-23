import {BackupLocation} from '../backup/BackupActionCreators'
import {post} from './Gateway'
import {UntrustedData} from '../configuration/LocalRepository'
import {Request} from 'superagent'

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

export function fetchConfiguration(from: string, id: string, token: string, url: string): Request {
  return post('/api/import', {from, id, token, url})
}
