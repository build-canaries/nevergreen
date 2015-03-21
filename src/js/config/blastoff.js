module.exports = function () {
    var trackingRepository = require('../storage/trackingRepository')
    var successRepository = require('../storage/successRepository')
    var timingRepository = require('../storage/timingRepository')

    var migrations = require('../storage/migrations')
    migrations.migrate()

    // React
    var reactTrackingView = require('../views/tracking/trackingSection')
    reactTrackingView.render(trackingRepository.getTrays())

    var reactSuccessView = require('../views/success/successSection')
    reactSuccessView.render(successRepository.getSuccessMessages())

    var reactTimingView = require('../views/config/timingSection')
    reactTimingView.render(timingRepository.getPollingTime())
}