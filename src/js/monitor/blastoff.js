module.exports = function () {
    var successMessage = require('../domain/successMessage')
    var trackingRepository = require('../storage/trackingRepository')
    var successRepository = require('../storage/successRepository')
    var timingRepository = require('../storage/timingRepository')
    var appender = require('./appender')(successRepository, successMessage)
    var monitor = require('./monitor')(trackingRepository, appender)

    var pollingTime = timingRepository.getPollingTimeInMilliseconds()

    monitor.init()

    // run immediately
    monitor.updateBuildMonitor()

    //schedule runs
    setInterval(function () {
        monitor.updateBuildMonitor()
    }, pollingTime)
}
