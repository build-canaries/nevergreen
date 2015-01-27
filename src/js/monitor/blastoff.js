module.exports = function () {
    var trackingRepository = require('../storage/trackingRepository')
    var successRepository = require('../storage/successRepository')
    var timingRepository = require('../storage/timingRepository')
    var appender = require('./appender')(successRepository)
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
