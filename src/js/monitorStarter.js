var Config = require('./config')
var Monitor = require('./monitor')

function start() {
    var fiveSeconds = 5000
    new Monitor(fiveSeconds, new Config()).start()
}
start()