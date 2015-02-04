module.exports = function () {
    var successMessage = require('../domain/successMessage')
    var repository = require('../storage/repository')
    var trackingRepository = require('../storage/trackingRepository')(repository)
    var successRepository = require('../storage/successRepository')(repository)
    var timingRepository = require('../storage/timingRepository')(repository)
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
