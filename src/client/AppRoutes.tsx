import React, {ReactElement} from 'react'
import {Route} from 'react-router'
import {Monitor} from './monitor/Monitor'
import {Settings} from './settings/Settings'
import {TrackingPage} from './settings/tracking/TrackingPage'
import {AddFeed} from './settings/tracking/AddFeed'
import {FeedPage} from './settings/tracking/FeedPage'
import {ManageProjectsPage} from './settings/tracking/projects/ManageProjectsPage'
import {UpdateDetailsPage} from './settings/tracking/settings/UpdateDetailsPage'
import {UpdateConnectionPage} from './settings/tracking/settings/UpdateConnectionPage'
import {SuccessMessages} from './settings/success/SuccessMessages'
import {AddMessage} from './settings/success/AddMessage'
import {DisplaySettings} from './settings/display/DisplaySettings'
import {Preview} from './settings/Preview'
import {NotificationSettings} from './settings/notifications/NotificationSettings'
import {BackupPage} from './settings/backup/BackupPage'
import {AddBackup} from './settings/backup/AddBackup'
import {ExportLocal} from './settings/backup/export/ExportLocal'
import {ImportLocal} from './settings/backup/import/ImportLocal'
import {ExportRemote} from './settings/backup/export/ExportRemote'
import {ImportRemote} from './settings/backup/import/ImportRemote'
import {Reset} from './settings/reset/Reset'
import {Navigate, Routes} from 'react-router-dom'
import {StyleGuide} from './styleGuide/StyleGuide'
import {Nevergreen} from './Nevergreen'
import {RemoteLocationPage} from './settings/backup/RemoteLocationPage'

export const routeMonitor = '/monitor'
export const routeSettings = '/settings'
export const routeTracking = '/settings/tracking'
export const routeTrackingAdd = '/settings/tracking/add'
export const routeTrackingProjects = '/settings/tracking/:id/projects'
export const routeTrackingDetails = '/settings/tracking/:id/details'
export const routeTrackingDetailsConnection = '/settings/tracking/:id/details/connection'
export const routeSuccess = '/settings/success'
export const routeSuccessAdd = '/settings/success/add'
export const routeDisplay = '/settings/display'
export const routeNotifications = '/settings/notifications'
export const routeBackup = '/settings/backup'
export const routeBackupAdd = '/settings/backup/add'
export const routeBackupImportLocal = '/settings/backup/local/import'
export const routeBackupImportRemote = '/settings/backup/:internalId/import'
export const routeBackupExportLocal = '/settings/backup/local/export'
export const routeBackupExportRemote = '/settings/backup/:internalId/export'
export const routePreview = '/preview'

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<Nevergreen/>}>
        <Route path={routeMonitor} element={<Monitor/>}/>
        <Route path={routeSettings} element={<Settings/>}>
          <Route path='tracking' element={<TrackingPage/>}/>
          <Route path='tracking/add' element={<AddFeed/>}/>
          <Route path='tracking/:id' element={<FeedPage/>}>
            <Route path='projects' element={<ManageProjectsPage/>}/>
            <Route path='details' element={<UpdateDetailsPage/>}/>
            <Route path='details/connection' element={<UpdateConnectionPage/>}/>
            <Route index element={<Navigate to={routeTracking}/>}/>
          </Route>
          <Route path='success' element={<SuccessMessages/>}/>
          <Route path='success/add' element={<AddMessage/>}/>
          <Route path='display' element={<DisplaySettings/>}/>
          <Route path='notifications' element={<NotificationSettings/>}/>
          <Route path='backup' element={<BackupPage/>}/>
          <Route path='backup/add' element={<AddBackup/>}/>
          <Route path='backup/local/export' element={<ExportLocal/>}/>
          <Route path='backup/local/import' element={<ImportLocal/>}/>
          <Route path='backup/:internalId' element={<RemoteLocationPage/>}>
            <Route path='export' element={<ExportRemote/>}/>
            <Route path='import' element={<ImportRemote/>}/>
            <Route index element={<Navigate to={routeBackup}/>}/>
          </Route>
          <Route path='reset' element={<Reset/>}/>
          <Route index element={<Navigate to='tracking'/>}/>
        </Route>
        <Route path={routePreview} element={<Preview/>}/>
        <Route path='/style-guide' element={<StyleGuide/>}/>
        <Route path='/*' element={<Navigate to={routeSettings}/>}/>
      </Route>
    </Routes>
  )
}
