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
import { ExportRemotePage } from './settings/backup/export/ExportRemotePage'
import { ImportRemotePage } from './settings/backup/import/ImportRemotePage'
import { StyleGuide } from './styleGuide/StyleGuide'
import { Nevergreen } from './Nevergreen'
import { RemoteLocationPage } from './settings/backup/RemoteLocationPage'
import { AboutPage } from './footer/AboutPage'
import { RemoteBackupDetailsPage } from './settings/backup/RemoteBackupDetailsPage'
import { AddNotificationPage } from './settings/notifications/AddNotificationPage'
import { OtherSettingsPage } from './settings/other/OtherSettingsPage'
import { ChangePrognosisColoursPage } from './settings/display/ChangePrognosisColoursPage'
import { Prognosis } from './domain/Project'
import { ChangeSuccessColoursPage } from './settings/success/ChangeSuccessColoursPage'
import { ImportLocalPage } from './settings/backup/import/ImportLocalPage'
import { ImportSuccessPage } from './settings/backup/import/ImportSuccessPage'

export enum RoutePaths {
  about = '/settings/about',
  backup = '/settings/backup',
  backupAdd = '/settings/backup/add',
  backupExportDetails = '/settings/backup/:internalId/details',
  backupExportLocal = '/settings/backup/local/export',
  backupExportRemote = '/settings/backup/:internalId/export',
  backupImportLocal = '/settings/backup/local/import',
  backupImportRemote = '/settings/backup/:internalId/import',
  backupImportSuccess = '/settings/backup/import-success',
  colours = '/settings/colours/:for',
  display = '/settings/display',
  monitor = '/monitor',
  notifications = '/settings/notifications',
  notificationsAdd = '/settings/notifications/add',
  other = '/settings/other',
  preview = '/preview',
  settings = '/settings',
  success = '/settings/success',
  tracking = '/settings/tracking',
  trackingAdd = '/settings/tracking/add',
  trackingDetails = '/settings/tracking/:id/details',
  trackingDetailsConnection = '/settings/tracking/:id/details/connection',
  trackingProjects = '/settings/tracking/:id/projects',
}

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<Nevergreen />}>
        <Route path={RoutePaths.monitor} element={<Monitor />} />
        <Route path={RoutePaths.settings} element={<Settings />}>
          <Route path="tracking" element={<TrackingPage />} />
          <Route path="tracking/add" element={<AddFeedPage />} />
          <Route path="tracking/:id" element={<FeedPage />}>
            <Route path="projects" element={<ManageProjectsPage />} />
            <Route path="details" element={<UpdateDetailsPage />} />
            <Route
              path="details/connection"
              element={<UpdateConnectionPage />}
            />
            <Route index element={<Navigate to={RoutePaths.tracking} />} />
          </Route>
          <Route path="success" element={<SuccessMessagesPage />} />
          <Route path="success/add" element={<AddMessagePage />} />
          <Route path="display" element={<DisplaySettingsPage />} />
          <Route
            path="colours/success"
            element={<ChangeSuccessColoursPage />}
          />
          {Object.values(Prognosis).map((prognosis) => {
            return (
              <Route
                key={prognosis}
                path={`colours/${prognosis}`}
                element={<ChangePrognosisColoursPage prognosis={prognosis} />}
              />
            )
          })}
          <Route path="notifications" element={<NotificationSettingsPage />} />
          <Route path="notifications/add" element={<AddNotificationPage />} />
          <Route path="backup" element={<BackupPage />} />
          <Route path="backup/add" element={<AddBackupPage />} />
          <Route path="backup/import-success" element={<ImportSuccessPage />} />
          <Route path="backup/local">
            <Route path="export" element={<ExportLocallyPage />} />
            <Route path="import" element={<ImportLocalPage />} />
          </Route>
          <Route path="backup/:internalId" element={<RemoteLocationPage />}>
            <Route path="export" element={<ExportRemotePage />} />
            <Route path="import" element={<ImportRemotePage />} />
            <Route path="details" element={<RemoteBackupDetailsPage />} />
          </Route>
          <Route path="other" element={<OtherSettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route index element={<Navigate to="tracking" />} />
        </Route>
        <Route path={RoutePaths.preview} element={<Preview />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/*" element={<Navigate to={RoutePaths.settings} />} />
      </Route>
    </Routes>
  )
}
