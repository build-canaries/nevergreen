import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/app'
import MonitorSection from './views/monitor/monitorSection'
import TrackingSection from './views/tracking/trackingSection'
import SuccessSection from './views/success/successSection'
import DisplaySection from './views/display/displaySection'
import ExportSection from './views/export/exportSection'
import HelpSection from './views/help/helpSection'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'

const routes = (
  <Route path='/' component={App}>
    <Route path='monitor' component={MonitorSection}/>
    <Route path='tracking' component={TrackingSection}/>
    <Route path='success' component={SuccessSection}/>
    <Route path='display' component={DisplaySection}/>
    <Route path='export' component={ExportSection}/>
    <Route path='help' component={HelpSection}/>
    <Route path="*" component={TrackingSection}/>
    <IndexRoute component={TrackingSection}/>
  </Route>
)

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('content'))
