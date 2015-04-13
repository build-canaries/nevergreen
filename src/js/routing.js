var $ = require('jquery')
var React = require('react')
var Router = require('react-router')
var App = require('./views/app')
var MonitorSection = require('./views/monitor/monitorSection')
var TrackingSection = require('./views/tracking/trackingSection')
var TimingSection = require('./views/config/timingSection')
var SuccessSection = require('./views/success/successSection')

var DefaultRoute = Router.DefaultRoute
var Route = Router.Route

var routes = (
    <Route name='app' path='/' handler={App.App}>
        <Route name='monitor' handler={MonitorSection.MonitorSection}/>
        <Route name='tracking' handler={TrackingSection.TrackingSection}/>
        <Route name='timing' handler={TimingSection.TimingSection}/>
        <Route name='success' handler={SuccessSection.SuccessSection}/>
        <DefaultRoute handler={TrackingSection.TrackingSection}/>
    </Route>
)

Router.run(routes, function (Handler) {
    React.render(<Handler/>, $('#content')[0]);
})
