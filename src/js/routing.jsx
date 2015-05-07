var $ = require('jquery')
var React = require('react')
var Router = require('react-router')
var App = require('./views/app')
var MonitorSection = require('./views/monitor/monitorSection').MonitorSection
var TrackingSection = require('./views/tracking/trackingSection').TrackingSection
var TimingSection = require('./views/config/timingSection').TimingSection
var SuccessSection = require('./views/success/successSection').SuccessSection
var HelpSection = require('./views/help/helpSection').HelpSection

var DefaultRoute = Router.DefaultRoute
var Route = Router.Route

var routes = (
    <Route name='app' path='/' handler={App.App}>
        <Route name='monitor' handler={MonitorSection}/>
        <Route name='tracking' handler={TrackingSection}/>
        <Route name='timing' handler={TimingSection}/>
        <Route name='success' handler={SuccessSection}/>
        <Route name='help' handler={HelpSection}/>
        <DefaultRoute handler={TrackingSection}/>
    </Route>
)

Router.run(routes, function (Handler) {
    React.render(<Handler/>, $('#content')[0]);
})
