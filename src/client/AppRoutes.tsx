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
import {AboutPage} from './footer/AboutPage'

export const ROUTE_MONITOR = '/monitor'
export const ROUTE_SETTINGS = '/settings'
export const ROUTE_TRACKING = '/settings/tracking'
export const ROUTE_TRACKING_ADD = '/settings/tracking/add'
export const ROUTE_TRACKING_PROJECTS = '/settings/tracking/:id/projects'
export const ROUTE_TRACKING_DETAILS = '/settings/tracking/:id/details'
export const ROUTE_TRACKING_DETAILS_CONNECTION = '/settings/tracking/:id/details/connection'
export const ROUTE_SUCCESS = '/settings/success'
export const ROUTE_DISPLAY = '/settings/display'
export const ROUTE_NOTIFICATIONS = '/settings/notifications'
export const ROUTE_BACKUP = '/settings/backup'
export const ROUTE_BACKUP_ADD = '/settings/backup/add'
export const ROUTE_BACKUP_IMPORT_LOCAL = '/settings/backup/local/import'
export const ROUTE_BACKUP_IMPORT_REMOTE = '/settings/backup/:internalId/import'
export const ROUTE_BACKUP_EXPORT_LOCAL = '/settings/backup/local/export'
export const ROUTE_BACKUP_EXPORT_REMOTE = '/settings/backup/:internalId/export'
export const ROUTE_ABOUT = '/settings/about'
export const ROUTE_PREVIEW = '/preview'

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<Nevergreen/>}>
        <Route path={ROUTE_MONITOR} element={<Monitor/>}/>
        <Route path={ROUTE_SETTINGS} element={<Settings/>}>
          <Route path='tracking' element={<TrackingPage/>}/>
          <Route path='tracking/add' element={<AddFeed/>}/>
          <Route path='tracking/:id' element={<FeedPage/>}>
            <Route path='projects' element={<ManageProjectsPage/>}/>
            <Route path='details' element={<UpdateDetailsPage/>}/>
            <Route path='details/connection' element={<UpdateConnectionPage/>}/>
            <Route index element={<Navigate to={ROUTE_TRACKING}/>}/>
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
            <Route index element={<Navigate to={ROUTE_BACKUP}/>}/>
          </Route>
          <Route path='reset' element={<Reset/>}/>
          <Route path='about' element={<AboutPage/>}/>
          <Route index element={<Navigate to='tracking'/>}/>
        </Route>
        <Route path={ROUTE_PREVIEW} element={<Preview/>}/>
        <Route path='/style-guide' element={<StyleGuide/>}/>
        <Route path='/*' element={<Navigate to={ROUTE_SETTINGS}/>}/>
      </Route>
    </Routes>
  )
}
