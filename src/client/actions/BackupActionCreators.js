import {BACKUP_SET_DESCRIPTION, BACKUP_SET_ID, BACKUP_SET_URL} from './Actions'

export function backupSetId(location, id) {
  return {type: BACKUP_SET_ID, location, id}
}

export function backupSetDescription(location, description) {
  return {type: BACKUP_SET_DESCRIPTION, location, description}
}

export function backupSetUrl(location, url) {
  return {type: BACKUP_SET_URL, location, url}
}
