module.exports = function () {
    var repository = require('../storage/repository')
    var trackingRepository = require('../storage/trackingRepository')(repository)
    var successRepository = require('../storage/successRepository')(repository)
    var timingRepository = require('../storage/timingRepository')(repository)
    var migrations = require('../storage/migrations')(successRepository)

    migrations.migrate()

    var pollingTime = timingRepository.getPollingTimeInMilliseconds()

    var monitor = require('../views/monitor')
    monitor.render(pollingTime)

    var menu = require('../views/menu')
    menu.render()
}
