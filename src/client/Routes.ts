export const ROUTE_ANCHOR_BACKUP = '#backup'
export const ROUTE_ANCHOR_SUCCESS = '#success'

export const ROUTE_MONITOR = '/monitor'
export const ROUTE_PREVIEW = '/preview'
export const ROUTE_TRACKING = '/tracking'
export const ROUTE_SETTINGS = '/settings'
export const ROUTE_SETTINGS_ANCHOR_BACKUP = `${ROUTE_SETTINGS}${ROUTE_ANCHOR_BACKUP}`
export const ROUTE_SETTINGS_ANCHOR_SUCCESS = `${ROUTE_SETTINGS}${ROUTE_ANCHOR_SUCCESS}`
export const ROUTE_SUCCESS = `${ROUTE_SETTINGS}/success`
export const ROUTE_SUCCESS_ADD = `${ROUTE_SUCCESS}/add`
export const ROUTE_BACKUP = `${ROUTE_SETTINGS}/backup`
export const ROUTE_BACKUP_ADD = `${ROUTE_BACKUP}/add`
export const ROUTE_EXPORT_LOCAL = `${ROUTE_BACKUP}/export`
export const ROUTE_EXPORT_REMOTE = `${ROUTE_BACKUP}/export/:internalId`
export const ROUTE_IMPORT_LOCAL = `${ROUTE_BACKUP}/import`
export const ROUTE_IMPORT_REMOTE = `${ROUTE_BACKUP}/import/:internalId`
export const ROUTE_STYLE_GUIDE = '/style-guide'

export function routeExportRemote(internalId: string): string {
  return ROUTE_EXPORT_REMOTE.replace(':internalId', internalId)
}

export function routeImportRemote(internalId: string): string {
  return ROUTE_IMPORT_REMOTE.replace(':internalId', internalId)
}
