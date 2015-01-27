module.exports = function () {
    var configView = require('./configView')
    var trackingView = require('./trackingView')
    var successView = require('./successView')
    var timingView = require('./timingView')
    var adminController = require('./adminController')
    var trackingRepository = require('../storage/trackingRepository')
    var successRepository = require('../storage/successRepository')
    var timingRepository = require('../storage/timingRepository')
    var projectsView = require('./projectsView')

    trackingView(adminController, trackingRepository, projectsView(trackingRepository), configView).init()
    successView(successRepository).init()
    timingView(timingRepository).init()
}