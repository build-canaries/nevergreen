module.exports = function () {
    var adminView = require('./adminView')
    var adminController = require('./adminController')
    var storageRepository = require('./storageRepository')
    var projectsView = require('./projectsView')

    adminView(adminController, storageRepository, projectsView(storageRepository)).init()
}