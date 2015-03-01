var projectsService = require('./projects')
var monitorView = require('../views/monitor')
var successView = require('../views/success')
var repo = require('../storage/repository')
var successRepository = require('../storage/successRepository')(repo)

module.exports = {
    update: function () {
        projectsService.fetchInteresting(selectView)
    }
}

var selectView = function (data) {
    if (data.length === 0) {
        var message = successRepository.randomSuccessMessage();
        if (isUrl(message)) {
            successView.renderImage(message)
        } else {
            successView.renderMessage(message)
        }
    } else {
        monitorView.render(data)
    }
}

function isUrl(message) {
    return startsWith(message, 'http')
}

function startsWith(s, prefix) {
    return s.lastIndexOf(prefix, 0) === 0
}
