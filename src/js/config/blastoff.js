module.exports = function () {
    var adminView = require('./adminView')
    var adminController = require('./adminController')
    var config = require('./config')
    var storageRepository = require('./storageRepository')

    adminView(adminController, storageRepository).init()
}