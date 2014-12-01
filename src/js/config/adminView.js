var $ = require('jquery')
var config = require('./config')
var projectsView = require('./projectsView')

module.exports = function (controller) {
    var view = {
        init: function () {
            load(controller, view.appendProjects, view.showSpinner, view.hideSpinner)
            this.addClickHandlers()
        },

        appendProjects: function (projects) {
            showExtraControls(projects, projectsView)
            view.projView().listProjects(config, projects)
            saveAllProjects(controller, projects)
            view.saveProjects()
        },

        saveProjects: function () {
            var includedProjects = view.projView().findIncludedProjects()
            controller.saveIncludedProjects(includedProjects)
        },

        addClickHandlers: function () {
            $('#cctray-save').click(function() { saveCctray(controller, view.appendProjects, view.showSpinner, view.hideSpinner) })
            $('#save-projects').click(function() { monitorPage(controller) })
            $('#include-all').click(view.projView().includeAll)
            $('#exclude-all').click(view.projView().excludeAll)
        },

        projView: function() {
            return projectsView(view.saveProjects)
        },

        showSpinner: function () {
            $('#loading-modal').addClass('loading')
            $('#spinner').show()
        },

        hideSpinner: function () {
            $('#loading-modal').removeClass('loading')
            $('#spinner').hide()
        }
    }
    return view
}

function showExtraControls() {
    $('#project-controls').removeClass('hidden')
    $('#success').removeClass('hidden')
}

function load(controller, postLoadCallback, showSpinner, hideSpinner) {
    var settings = config.load()
    $('#cctray-url').val(settings.cctray)
    $('#success-text').val(settings.successText)
    if (config.hasCctray()) {
        controller.getProjects(config, postLoadCallback, showSpinner, hideSpinner)
    }
}

function saveCctray(controller, postLoadCallback, showSpinner, hideSpinner) {
    config.save({cctray: $('#cctray-url').val().trim()})
    controller.getProjects(config, postLoadCallback, showSpinner, hideSpinner)
}

function saveSuccessText(controller) {
    var text = $('#success-text').val()
    controller.saveSuccessText(text)
}

function monitorPage(controller) {
    saveSuccessText(controller)
    window.location.replace('/')
}

function saveAllProjects(controller, projects) {
    var seenProjects = $.map(projects, function (project) { return project.name })
    controller.saveSeenProjects(seenProjects)
}