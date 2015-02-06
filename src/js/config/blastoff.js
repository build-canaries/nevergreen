module.exports = function () {
    var configView = require('./configView')
    var trackingView = require('./trackingView')
    var successView = require('./successView')
    var timingView = require('./timingView')
    var repository = require('../storage/repository')
    var trackingRepository = require('../storage/trackingRepository')(repository)
    var successRepository = require('../storage/successRepository')(repository)
    var timingRepository = require('../storage/timingRepository')(repository)
    var adminController = require('./adminController')(trackingRepository, configView)
    var projectsView = require('./projectsView')
    var migrations = require('../storage/migrations')(successRepository)

    migrations.migrate()

    trackingView(adminController, trackingRepository, projectsView(trackingRepository), configView).init()
    successView(successRepository).init()
    timingView(timingRepository).init()
}