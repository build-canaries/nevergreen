import type { Router } from '@remix-run/router'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Settings } from './settings/Settings'
import { TrackingPage } from './settings/tracking/TrackingPage'
import { FeedPage } from './settings/tracking/FeedPage'
import { Nevergreen } from './Nevergreen'
import { RemoteLocationPage } from './settings/backup/RemoteLocationPage'
import { Prognosis } from './domain/Project'
import { UnhandledErrorMessage } from './UnhandledErrorMessage'

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
  display = '/settings/display',
  prognosis = '/settings/prognosis',
  prognosisEdit = '/settings/prognosis/:for',
  monitor = '/monitor',
  notifications = '/settings/notifications',
  other = '/settings/other',
  preview = '/preview',
  settings = '/settings',
  success = '/settings/success',
  successAdd = '/settings/success/add',
  tracking = '/settings/tracking',
  trackingAdd = '/settings/tracking/add',
  trackingDetails = '/settings/tracking/:id/details',
  trackingDetailsConnection = '/settings/tracking/:id/details/connection',
  trackingProjects = '/settings/tracking/:id/projects',
}

export function appRoutes(): Router {
  return createBrowserRouter([
    {
      element: <Nevergreen />,
      errorElement: <UnhandledErrorMessage />,
      children: [
        { path: RoutePaths.monitor, lazy: () => import('./monitor/Monitor') },
        {
          path: RoutePaths.settings,
          element: <Settings />,
          children: [
            { path: 'tracking', element: <TrackingPage /> },
            {
              path: 'tracking/add',
              lazy: () => import('./settings/tracking/AddFeedPage'),
            },
            {
              path: 'tracking/:id',
              element: <FeedPage />,
              children: [
                {
                  path: 'projects',
                  lazy: () =>
                    import('./settings/tracking/projects/ManageProjectsPage'),
                },
                {
                  path: 'details',
                  lazy: () =>
                    import('./settings/tracking/settings/UpdateDetailsPage'),
                },
                {
                  path: 'details/connection',
                  lazy: () =>
                    import('./settings/tracking/settings/UpdateConnectionPage'),
                },
                { index: true, element: <Navigate to={RoutePaths.tracking} /> },
              ],
            },
            {
              path: 'success',
              lazy: () => import('./settings/success/SuccessMessagesPage'),
            },
            {
              path: 'success/add',
              lazy: () => import('./settings/success/AddMessagePage'),
            },
            {
              path: 'display',
              lazy: () => import('./settings/display/DisplaySettingsPage'),
            },
            {
              path: 'notifications',
              lazy: () =>
                import('./settings/notifications/NotificationSettingsPage'),
            },
            {
              path: 'prognosis',
              lazy: () => import('./settings/prognosis/PrognosisSettingsPage'),
            },
            ...Object.values(Prognosis).map((prognosis) => {
              return {
                path: `prognosis/${prognosis}`,
                async lazy() {
                  const { PrognosisEditPage } = await import(
                    './settings/prognosis/PrognosisEditPage'
                  )
                  return {
                    element: <PrognosisEditPage prognosis={prognosis} />,
                  }
                },
              }
            }),
            {
              path: 'backup',
              lazy: () => import('./settings/backup/BackupPage'),
            },
            {
              path: 'backup/add',
              lazy: () => import('./settings/backup/AddBackupPage'),
            },
            {
              path: 'backup/import-success',
              lazy: () => import('./settings/backup/import/ImportSuccessPage'),
            },
            {
              path: 'backup/local/export',
              lazy: () => import('./settings/backup/export/ExportLocallyPage'),
            },
            {
              path: 'backup/local/import',
              lazy: () => import('./settings/backup/import/ImportLocalPage'),
            },
            {
              path: 'backup/:internalId',
              element: <RemoteLocationPage />,
              children: [
                {
                  path: 'export',
                  lazy: () =>
                    import('./settings/backup/export/ExportRemotePage'),
                },
                {
                  path: 'import',
                  lazy: () =>
                    import('./settings/backup/import/ImportRemotePage'),
                },
                {
                  path: 'details',
                  lazy: () =>
                    import('./settings/backup/RemoteBackupDetailsPage'),
                },
              ],
            },
            {
              path: 'other',
              lazy: () => import('./settings/other/OtherSettingsPage'),
            },
            { path: 'about', lazy: () => import('./footer/AboutPage') },
            { index: true, element: <Navigate to="tracking" /> },
          ],
        },
        { path: RoutePaths.preview, lazy: () => import('./settings/Preview') },
        { path: '/style-guide', lazy: () => import('./styleGuide/StyleGuide') },
        { path: '/*', element: <Navigate to={RoutePaths.settings} /> },
      ],
    },
  ])
}
