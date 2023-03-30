import type { ReactElement } from 'react'
import { Route } from 'react-router'
import { Navigate, Routes } from 'react-router-dom'
import { Monitor } from './monitor/Monitor'
import { Settings } from './settings/Settings'
import { TrackingPage } from './settings/tracking/TrackingPage'
import { AddFeedPage } from './settings/tracking/AddFeedPage'
import { FeedPage } from './settings/tracking/FeedPage'
import { ManageProjectsPage } from './settings/tracking/projects/ManageProjectsPage'
import { UpdateDetailsPage } from './settings/tracking/settings/UpdateDetailsPage'
import { UpdateConnectionPage } from './settings/tracking/settings/UpdateConnectionPage'
import { SuccessMessagesPage } from './settings/success/SuccessMessagesPage'
import { AddMessagePage } from './settings/success/AddMessagePage'
import { DisplaySettingsPage } from './settings/display/DisplaySettingsPage'
import { Preview } from './settings/Preview'
import { NotificationSettingsPage } from './settings/notifications/NotificationSettingsPage'
import { BackupPage } from './settings/backup/BackupPage'
import { AddBackupPage } from './settings/backup/AddBackupPage'
import { ExportLocallyPage } from './settings/backup/export/ExportLocallyPage'
import { ImportLocalPage } from './settings/backup/import/ImportLocalPage'
import { ExportRemotePage } from './settings/backup/export/ExportRemotePage'
import { ImportRemotePage } from './settings/backup/import/ImportRemotePage'
import { StyleGuide } from './styleGuide/StyleGuide'
import { Nevergreen } from './Nevergreen'
import { RemoteLocationPage } from './settings/backup/RemoteLocationPage'
import { AboutPage } from './footer/AboutPage'
import { RemoteBackupDetailsPage } from './settings/backup/RemoteBackupDetailsPage'
import { AddNotificationPage } from './settings/notifications/AddNotificationPage'
import { OtherSettingsPage } from './settings/other/OtherSettingsPage'

export const ROUTE_MONITOR = '/monitor'
export const ROUTE_SETTINGS = '/settings'
export const ROUTE_TRACKING = '/settings/tracking'
export const ROUTE_TRACKING_ADD = '/settings/tracking/add'
export const ROUTE_TRACKING_PROJECTS = '/settings/tracking/:id/projects'
export const ROUTE_TRACKING_DETAILS = '/settings/tracking/:id/details'
export const ROUTE_TRACKING_DETAILS_CONNECTION =
  '/settings/tracking/:id/details/connection'
export const ROUTE_SUCCESS = '/settings/success'
export const ROUTE_DISPLAY = '/settings/display'
export const ROUTE_NOTIFICATIONS = '/settings/notifications'
export const ROUTE_NOTIFICATIONS_ADD = '/settings/notifications/add'
export const ROUTE_BACKUP = '/settings/backup'
export const ROUTE_BACKUP_ADD = '/settings/backup/add'
export const ROUTE_BACKUP_IMPORT_LOCAL = '/settings/backup/local/import'
export const ROUTE_BACKUP_IMPORT_REMOTE = '/settings/backup/:internalId/import'
export const ROUTE_BACKUP_EXPORT_LOCAL = '/settings/backup/local/export'
export const ROUTE_BACKUP_EXPORT_REMOTE = '/settings/backup/:internalId/export'
export const ROUTE_BACKUP_EXPORT_DETAILS =
  '/settings/backup/:internalId/details'
export const ROUTE_OTHER = '/settings/other'
export const ROUTE_ABOUT = '/settings/about'
export const ROUTE_PREVIEW = '/preview'

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<Nevergreen />}>
        <Route path={ROUTE_MONITOR} element={<Monitor />} />
        <Route path={ROUTE_SETTINGS} element={<Settings />}>
          <Route path="tracking" element={<TrackingPage />} />
          <Route path="tracking/add" element={<AddFeedPage />} />
          <Route path="tracking/:id" element={<FeedPage />}>
            <Route path="projects" element={<ManageProjectsPage />} />
            <Route path="details" element={<UpdateDetailsPage />} />
            <Route
              path="details/connection"
              element={<UpdateConnectionPage />}
            />
            <Route index element={<Navigate to={ROUTE_TRACKING} />} />
          </Route>
          <Route path="success" element={<SuccessMessagesPage />} />
          <Route path="success/add" element={<AddMessagePage />} />
          <Route path="display" element={<DisplaySettingsPage />} />
          <Route path="notifications" element={<NotificationSettingsPage />} />
          <Route path="notifications/add" element={<AddNotificationPage />} />
          <Route path="backup" element={<BackupPage />} />
          <Route path="backup/add" element={<AddBackupPage />} />
          <Route path="backup/local/export" element={<ExportLocallyPage />} />
          <Route path="backup/local/import" element={<ImportLocalPage />} />
          <Route path="backup/:internalId" element={<RemoteLocationPage />}>
            <Route path="export" element={<ExportRemotePage />} />
            <Route path="import" element={<ImportRemotePage />} />
            <Route path="details" element={<RemoteBackupDetailsPage />} />
            <Route index element={<Navigate to={ROUTE_BACKUP} />} />
          </Route>
          <Route path="other" element={<OtherSettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route index element={<Navigate to="tracking" />} />
        </Route>
        <Route path={ROUTE_PREVIEW} element={<Preview />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/*" element={<Navigate to={ROUTE_SETTINGS} />} />
      </Route>
    </Routes>
  )
}
