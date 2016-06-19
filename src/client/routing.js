import React from 'react'
import ReactDOM from 'react-dom'
import NevergreenContainer from './NevergreenContainer'
import MonitorContainer from './monitor/MonitorContainer'
import TrackingContainer from './tracking/TrackingContainer'
import SuccessContainer from './success/SuccessContainer'
import AudioVisualContainer from './audio-visual/AudioVisualContainer'
import BackupContainer from './backup/BackupContainer'
import Help from './help/Help'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'

const routes = (
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

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('root'))
