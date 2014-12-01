module.exports = function () {
    var adminView = require('./adminView')
    var adminController = require('./adminController')
    var config = require('./config')

    adminView(adminController).init(config)
}