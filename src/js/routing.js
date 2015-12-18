let React = require('react')
let ReactDOM = require('react-dom')
let Router = require('react-router')
let App = require('./views/app')
let MonitorSection = require('./views/monitor/monitorSection')
let TrackingSection = require('./views/tracking/trackingSection')
let SuccessSection = require('./views/success/successSection')
let DisplaySection = require('./views/display/displaySection')
let ExportSection = require('./views/export/exportSection')
let HelpSection = require('./views/help/helpSection')

let IndexRoute = Router.IndexRoute
let Route = Router.Route

let routes = (
  <Route path='/' component={App}>
    <Route path='monitor' component={MonitorSection}/>
    <Route path='tracking' component={TrackingSection}/>
    <Route path='success' component={SuccessSection}/>
    <Route path='display' component={DisplaySection}/>
    <Route path='export' component={ExportSection}/>
    <Route path='help' component={HelpSection}/>
    <IndexRoute component={TrackingSection}/>
  </Route>
)

ReactDOM.render(<Router.Router routes={routes}/>, document.getElementById('content'))
