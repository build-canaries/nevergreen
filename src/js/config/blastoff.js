module.exports = function () {
    var configView = require('./configView')
    var trackingView = require('./trackingView')
    var successView = require('./successView')
    var adminController = require('./adminController')
    var trackingRepository = require('../storage/trackingRepository')
    var successRepository = require('../storage/successRepository')
    var projectsView = require('./projectsView')

    trackingView(adminController, trackingRepository, projectsView(trackingRepository), configView).init()
    successView(successRepository).init()
}