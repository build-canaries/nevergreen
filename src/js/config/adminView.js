var $ = require('jquery')
var config = require('./config')
var projectsView = require('./projectsView')

module.exports = function (controller) {
    var view = {
        init: function () {
            load(view.getProjects)
            this.addClickHandlers()
        },

        appendProjects: function (projects) {
            view.projView().listProjects(config, projects)
            saveAllProjects(controller, projects)
            view.saveProjects()
        },

        saveProjects: function () {
            var includedProjects = view.projView().findIncludedProjects()
            controller.saveIncludedProjects(includedProjects)
        },

        addClickHandlers: function () {
            $('#save-projects').click(function() { monitorPage(controller) })
            $('#include-all').click(view.projView().includeAll)
            $('#exclude-all').click(view.projView().excludeAll)
            $('#save-success-text').click(function(e) { e.preventDefault(); saveSuccessText(controller) })
            $('#save-success-image').click(function(e) { e.preventDefault(); saveAndShowSuccessImage(controller) })

            $("#cctray-url").keypress(function(e) {
                if(e.which == 13) {
                    saveCctray(view.getProjects)
                }
            });

            $("#cctray-fetch").click(function(e) {
                e.preventDefault()
                saveCctray(view.getProjects)
            });
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
        },

        errorHandler: function(code, reason) {
            $('#projects').empty()
            $('#projects').append('<h1 class="config-error">Cannot find projects because<br />' + code + ': '+ reason + '</h1>')
        },

        getProjects: function() {
            controller.getProjects(require('./config'), view.appendProjects, view.showSpinner, view.hideSpinner, view.errorHandler)
        }

    }
    return view
}

function load(postLoadCallback) {
    var settings = config.load()
    $('#cctray-url').val(settings.cctray)
    $('#success-text').val(settings.successText)
    loadSuccessImage(settings);
    if (config.hasCctray()) {
        postLoadCallback()
    }
}
function saveCctray(postLoadCallback) {
    config.save({cctray: $('#cctray-url').val().trim()})
    postLoadCallback()
}

function saveSuccessText(controller) {
    var text = $('#success-text').val()
    controller.saveSuccessText(text)
}

function saveAndShowSuccessImage(controller) {
    var imageUrl = $('#success-image-url').val().trim()
    saveSuccessImageUrl(controller, imageUrl)
    showSuccessImage(imageUrl)
}

function saveSuccessImageUrl(controller, imageUrl) {
    controller.saveSuccessImageUrl(imageUrl)
}

function showSuccessImage(imageUrl) {
    var successImage = $('#success-image');
    successImage.attr('src', imageUrl)
    successImage.removeClass('hidden')
}

function loadSuccessImage(settings) {
    var imageUrl = settings.successImageUrl
    if (imageUrl) {
        $('#success-image-url').val(imageUrl)
        showSuccessImage(imageUrl)
    }
}

function monitorPage(controller) {
    saveSuccessText(controller)
}

function saveAllProjects(controller, projects) {
    var seenProjects = $.map(projects, function (project) { return project.name })
    controller.saveSeenProjects(seenProjects)
}