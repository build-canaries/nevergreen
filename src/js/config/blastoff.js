module.exports = function () {
    var timingView = require('./timingView')
    var repository = require('../storage/repository')
    var trackingRepository = require('../storage/trackingRepository')
    var successRepository = require('../storage/successRepository')
    var timingRepository = require('../storage/timingRepository')(repository)

    var migrations = require('../storage/migrations')
    migrations.migrate()

    //trackingView(adminController, trackingRepository, projectsView(trackingRepository), configView).init()
    timingView(timingRepository).init()

    // React
    var reactTrackingView = require('../views/tracking/trackingSection')
    reactTrackingView.render(trackingRepository.getTrays())

    var reactSuccessView = require('../views/config/success')
    reactSuccessView.render(successRepository.getSuccessMessages())
}