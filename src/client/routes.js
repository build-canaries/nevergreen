import React from 'react'
import NevergreenContainer from './NevergreenContainer'
import MonitorContainer from './monitor/MonitorContainer'
import TrackingContainer from './tracking/TrackingContainer'
import SuccessContainer from './success/SuccessContainer'
import AudioVisualContainer from './audio-visual/AudioVisualContainer'
import BackupContainer from './backup/BackupContainer'
import Help from './help/Help'
import {Route, IndexRoute} from 'react-router'

export default (
  <Route path='/' component={NevergreenContainer}>
    <Route path='monitor' component={MonitorContainer}/>
    <Route path='tracking' component={TrackingContainer}/>
    <Route path='success' component={SuccessContainer}/>
    <Route path='audio-visual' component={AudioVisualContainer}/>
    <Route path='backup' component={BackupContainer}/>
    <Route path='help' component={Help}/>
    <Route path="*" component={TrackingContainer}/>
    <IndexRoute component={TrackingContainer}/>
  </Route>
)
