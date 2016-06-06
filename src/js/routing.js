import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/app'
import MonitorContainer from './monitor/MonitorContainer'
import TrackingSection from './views/tracking/trackingSection'
import SuccessContainer from './success/SuccessContainer'
import AudioVisualContainer from './audio-visual/AudioVisualContainer'
import BackupContainer from './backup/BackupContainer'
import Help from './help/Help'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'

const routes = (
  <Route path='/' component={App}>
    <Route path='monitor' component={MonitorContainer}/>
    <Route path='tracking' component={TrackingSection}/>
    <Route path='success' component={SuccessContainer}/>
    <Route path='audio-visual' component={AudioVisualContainer}/>
    <Route path='backup' component={BackupContainer}/>
    <Route path='help' component={Help}/>
    <Route path="*" component={TrackingSection}/>
    <IndexRoute component={TrackingSection}/>
  </Route>
)

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('content'))
