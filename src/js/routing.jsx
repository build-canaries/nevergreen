var React = require('react')
var Router = require('react-router')
var App = require('./views/app')
var MonitorSection = require('./views/monitor/monitorSection')
var TrackingSection = require('./views/tracking/trackingSection')
var TimingSection = require('./views/timing/timingSection')
var SuccessSection = require('./views/success/successSection')
var ExportSection = require('./views/export/exportSection')
var HelpSection = require('./views/help/helpSection')

var IndexRoute = Router.IndexRoute
var Route = Router.Route

var routes = (
  <Route path='/' component={App}>
    <Route path='monitor' component={MonitorSection}/>
    <Route path='tracking' component={TrackingSection}/>
    <Route path='success' component={SuccessSection}/>
    <Route path='export' component={ExportSection}/>
    <Route path='help' component={HelpSection}/>
    <IndexRoute component={TrackingSection}/>
  </Route>
)

React.render(<Router.Router routes={routes}/>, document.getElementById('content'))
