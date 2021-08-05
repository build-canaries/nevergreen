import React, {ReactElement} from 'react'
import {NavLink} from 'react-router-dom'
import {Redirect, Route, Switch} from 'react-router'
import {
  ROUTE_BACKUP_ADD,
  ROUTE_EXPORT_LOCAL,
  ROUTE_EXPORT_REMOTE,
  ROUTE_IMPORT_LOCAL,
  ROUTE_IMPORT_REMOTE,
  ROUTE_SETTINGS,
  ROUTE_SETTINGS_BACKUP,
  ROUTE_SETTINGS_DISPLAY,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_SETTINGS_NOTIFICATIONS,
  ROUTE_SETTINGS_RESET,
  ROUTE_SETTINGS_SUCCESS,
  ROUTE_SETTINGS_TRACKING,
  ROUTE_SUCCESS_ADD,
  ROUTE_TRACKING_ADD,
  ROUTE_TRACKING_FEED
} from '../Routes'
import {TrackingPage} from '../tracking/TrackingPage'
import {AddMessage} from './success/AddMessage'
import {AddBackup} from './backup/AddBackup'
import {ExportLocal} from './backup/export/ExportLocal'
import {ExportRemote} from './backup/export/ExportRemote'
import {ImportLocal} from './backup/import/ImportLocal'
import {ImportRemote} from './backup/import/ImportRemote'
import styles from './settings.scss'
import {GeneralSettings} from './general/GeneralSettings'
import {DisplaySettings} from './display/DisplaySettings'
import {NotificationSettings} from './notifications/NotificationSettings'
import {SuccessMessages} from './success/SuccessMessages'
import {BackupPage} from './backup/BackupPage'
import {Reset} from './reset/Reset'
import {AddTray} from '../tracking/AddTray'
import {FeedPage} from '../tracking/FeedPage'
import {iBin, iCog, iDisplay, iEye, iFloppyDisk, iList, iNotification} from '../common/fonts/Icons'
import menuStyles from '../common/fonts/icon-font.scss'
import cn from 'classnames'

interface MenuItemProps {
  readonly to: string;
  readonly label: string;
  readonly icon: string;
}

function MenuItem({to, label, icon}: MenuItemProps): ReactElement {
  return (
    <li role='none'>
      <NavLink to={to}
               className={styles.link}
               activeClassName={styles.activeLink}
               role='menuitem'>
        <span className={cn(styles.menuIcon, menuStyles[`icon-${icon}`])} aria-hidden/>
        {label}
      </NavLink>
    </li>
  )
}

export function Settings(): ReactElement {
  return (
    <div className={styles.settings}>
      <Route exact path={ROUTE_SETTINGS}>
        <Redirect to={ROUTE_SETTINGS_TRACKING}/>
      </Route>
      <ul className={styles.menu} role='menu' aria-label='Settings'>
        <MenuItem to={ROUTE_SETTINGS_TRACKING} label='Tracking' icon={iList}/>
        <MenuItem to={ROUTE_SETTINGS_SUCCESS} label='Success' icon={iEye}/>
        <MenuItem to={ROUTE_SETTINGS_DISPLAY} label='Display' icon={iDisplay}/>
        <MenuItem to={ROUTE_SETTINGS_NOTIFICATIONS} label='Notifications' icon={iNotification}/>
        <MenuItem to={ROUTE_SETTINGS_BACKUP} label='Backup' icon={iFloppyDisk}/>
        <MenuItem to={ROUTE_SETTINGS_GENERAL} label='General' icon={iCog}/>
        <MenuItem to={ROUTE_SETTINGS_RESET} label='Reset' icon={iBin}/>
      </ul>
      <div>
        <Switch>
          <Route exact path={ROUTE_SETTINGS_TRACKING} component={TrackingPage}/>
          <Route exact path={ROUTE_TRACKING_ADD} component={AddTray}/>
          <Route path={ROUTE_TRACKING_FEED} component={FeedPage}/>
          <Route exact path={ROUTE_SETTINGS_SUCCESS} component={SuccessMessages}/>
          <Route exact path={ROUTE_SETTINGS_GENERAL} component={GeneralSettings}/>
          <Route exact path={ROUTE_SETTINGS_DISPLAY} component={DisplaySettings}/>
          <Route exact path={ROUTE_SETTINGS_NOTIFICATIONS} component={NotificationSettings}/>
          <Route exact path={ROUTE_SETTINGS_BACKUP} component={BackupPage}/>
          <Route exact path={ROUTE_SETTINGS_RESET} component={Reset}/>
          <Route exact path={ROUTE_SUCCESS_ADD} component={AddMessage}/>
          <Route exact path={ROUTE_BACKUP_ADD} component={AddBackup}/>
          <Route exact path={ROUTE_EXPORT_LOCAL} component={ExportLocal}/>
          <Route exact path={ROUTE_EXPORT_REMOTE} component={ExportRemote}/>
          <Route exact path={ROUTE_IMPORT_LOCAL} component={ImportLocal}/>
          <Route exact path={ROUTE_IMPORT_REMOTE} component={ImportRemote}/>
        </Switch>
      </div>
    </div>
  )
}
