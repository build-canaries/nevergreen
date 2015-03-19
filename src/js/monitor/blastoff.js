module.exports = function () {
    var repository = require('../storage/repository')
    var timingRepository = require('../storage/timingRepository')(repository)
    var migrations = require('../storage/migrations')

    migrations.migrate()

    var pollingTime = timingRepository.getPollingTimeInMilliseconds()

    var monitor = require('../views/monitor/monitorSection')
    monitor.render(pollingTime)

    var menu = require('../views/general/menu')
    menu.render()
}
