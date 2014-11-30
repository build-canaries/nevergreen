var $ = require('jquery')
var config = require('./config')
var projectsView = require('./projectsView')

module.exports = function (controller) {
    var view = {
        init: function () {
            load(controller, view.appendProjects)
            this.addClickHandlers()
        },

        appendProjects: function (projects) {
            showExtraControls(projects, projectsView)
            view.projView().listProjects(config, projects)
            controller.saveAllProjects($.map(projects, function (project) {
                return project.name
            }))
        },

        saveProjects: function () {
            var includedProjects = view.projView().findIncludedProjects()
            controller.saveIncludedProjects(includedProjects)
        },

        addClickHandlers: function () {
            $('#cctray-save').click(function() { saveCctray(controller, view.appendProjects) })
            $('#save-projects').click(function() { monitorPage(controller) })
            $('#include-all').click(view.projView().includeAll)
            $('#exclude-all').click(view.projView().excludeAll)
        },

        projView: function() {
            return projectsView(view.saveProjects)
        },

        showSpinner: showSpinner
    }
    return view
}

function showExtraControls() {
    $('#project-controls').removeClass('hidden')
    $('#success').removeClass('hidden')
}

function load(controller, postLoadCallback) {
    var settings = config.load()
    $('#cctray-url').val(settings.cctray)
    $('#success-text').val(settings.successText)
    if (config.hasCctray()) {
        controller.getProjects(config, postLoadCallback, showSpinner)
    }
}

function saveCctray(controller, postLoadCallback) {
    config.save({cctray: $('#cctray-url').val().trim()})
    controller.getProjects(config, postLoadCallback, showSpinner)
}

function saveSuccessText(controller) {
    var text = $('#success-text').val()
    controller.saveSuccessText(text)
}

function monitorPage(controller) {
    saveSuccessText(controller)
    window.location.replace('/')
}

function showSpinner(shouldShow) {
    if (shouldShow) {
        $('#loading-modal').addClass('loading')
        $('#spinner').show()
    } else {
        $('#loading-modal').removeClass('loading')
        $('#spinner').hide()
    }
}