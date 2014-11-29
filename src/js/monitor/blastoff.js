var config = require('../config/config')
var Monitor = require('./monitor')

var fiveSeconds = 5000
var monitor = new Monitor(config)

// run immediately
monitor.updateBuildMonitor()

// now run every 5 seconds
setInterval(function() { monitor.updateBuildMonitor() }, fiveSeconds)