const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./views/app')
const MonitorSection = require('./views/monitor/monitorSection')
const TrackingSection = require('./views/tracking/trackingSection')
const SuccessSection = require('./views/success/successSection')
const DisplaySection = require('./views/display/displaySection')
const ExportSection = require('./views/export/exportSection')
const HelpSection = require('./views/help/helpSection')

import { browserHistory, Router, Route, IndexRoute } from 'react-router'

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
