import React from 'react'
import NevergreenContainer from './NevergreenContainer'
import MonitorContainer from './monitor/MonitorContainer'
import TrackingContainer from './tracking/TrackingContainer'
import SuccessContainer from './success/SuccessContainer'
import SettingsContainer from './settings/SettingsContainer'
import BackupContainer from './backup/BackupContainer'
import HelpContainer from './help/HelpContainer'
import {Route, IndexRoute, Redirect} from 'react-router'

export default (
  <Route path='/' component={NevergreenContainer}>
    <Route path='monitor' component={MonitorContainer}/>
    <Route path='tracking' component={TrackingContainer}/>
    <Route path='success' component={SuccessContainer}/>
    <Route path='settings' component={SettingsContainer}/>
    <Redirect from='audio-visual' to='settings'/>
    <Route path='backup' component={BackupContainer}/>
    <Route path='help' component={HelpContainer}/>
    <Route path="*" component={TrackingContainer}/>
    <IndexRoute component={TrackingContainer}/>
  </Route>
)
