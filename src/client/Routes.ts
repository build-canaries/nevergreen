export const ROUTE_MONITOR = '/monitor'
export const ROUTE_PREVIEW = '/preview'
export const ROUTE_SETTINGS = '/settings'

// Settings routes
export const ROUTE_SETTINGS_TRACKING = `${ROUTE_SETTINGS}/tracking`
export const ROUTE_SETTINGS_DISPLAY = `${ROUTE_SETTINGS}/display`
export const ROUTE_SETTINGS_NOTIFICATIONS = `${ROUTE_SETTINGS}/notifications`
export const ROUTE_SETTINGS_SUCCESS = `${ROUTE_SETTINGS}/success`
export const ROUTE_SETTINGS_BACKUP = `${ROUTE_SETTINGS}/backup`
export const ROUTE_SETTINGS_RESET = `${ROUTE_SETTINGS}/reset`

// Tracking
export const ROUTE_TRACKING_ADD = `${ROUTE_SETTINGS_TRACKING}/add`
export const ROUTE_TRACKING_FEED = `${ROUTE_SETTINGS_TRACKING}/:id`
export const ROUTE_TRACKING_FEED_PROJECTS = `${ROUTE_TRACKING_FEED}/projects`
export const ROUTE_TRACKING_FEED_DETAILS = `${ROUTE_TRACKING_FEED}/details`
export const ROUTE_TRACKING_FEED_CONNECTION = `${ROUTE_TRACKING_FEED_DETAILS}/connection`
export const REFRESH_HASH = '#refresh'

export function routeFeed(id: string): string {
  return ROUTE_TRACKING_FEED.replace(':id', id)
}

export function routeFeedProjects(id: string, refresh = false): string {
  const path = ROUTE_TRACKING_FEED_PROJECTS.replace(':id', id)
  return refresh ? `${path}${REFRESH_HASH}` : path
}

export function routeFeedDetails(id: string): string {
  return ROUTE_TRACKING_FEED_DETAILS.replace(':id', id)
}

export function routeFeedConnection(id: string): string {
  return ROUTE_TRACKING_FEED_CONNECTION.replace(':id', id)
}

// Success messages
export const ROUTE_SUCCESS_ADD = `${ROUTE_SETTINGS_SUCCESS}/add`

// Backups
export const ROUTE_BACKUP_ADD = `${ROUTE_SETTINGS_BACKUP}/add`
export const ROUTE_EXPORT_LOCAL = `${ROUTE_SETTINGS_BACKUP}/export`
export const ROUTE_EXPORT_REMOTE = `${ROUTE_SETTINGS_BACKUP}/export/:internalId`
export const ROUTE_IMPORT_LOCAL = `${ROUTE_SETTINGS_BACKUP}/import`
export const ROUTE_IMPORT_REMOTE = `${ROUTE_SETTINGS_BACKUP}/import/:internalId`

export function routeExportRemote(internalId: string): string {
  return ROUTE_EXPORT_REMOTE.replace(':internalId', internalId)
}

export function routeImportRemote(internalId: string): string {
  return ROUTE_IMPORT_REMOTE.replace(':internalId', internalId)
}
