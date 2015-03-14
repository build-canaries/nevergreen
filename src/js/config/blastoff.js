module.exports = function () {
    var configView = require('./configView')
    var trackingView = require('./trackingView')
    var timingView = require('./timingView')
    var repository = require('../storage/repository')
    var trackingRepository = require('../storage/trackingRepository')(repository)
    var successRepository = require('../storage/successRepository')
    var timingRepository = require('../storage/timingRepository')(repository)
    var adminController = require('./adminController')(trackingRepository, configView)
    var projectsView = require('./projectsView')
    var migrations = require('../storage/migrations')

    migrations.migrate()

    trackingView(adminController, trackingRepository, projectsView(trackingRepository), configView).init()
    timingView(timingRepository).init()

    // React
    var reactSuccessView = require('../views/config/success')
    reactSuccessView.render(successRepository.getSuccessMessages())
}