module.exports = function () {
    var timingRepository = require('../storage/timingRepository')
    var migrations = require('../storage/migrations')

    migrations.migrate()

    var monitor = require('../views/monitor/monitorSection')
    monitor.render(timingRepository.getPollingTimeInMilliseconds())

    var menu = require('../views/general/menu')
    menu.render()
}
