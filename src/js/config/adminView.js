var $ = require('jquery')
var config = require('./config')
var projectsView = require('./projectsView')

module.exports = function (controller, storageRepository) {
    var view = {
        init: function () {
            load(storageRepository, view.getProjects)
            this.addClickHandlers()
        },

        appendProjects: function (projects) {
            view.projView().listProjects(storageRepository, config, projects)
            saveAllProjects(storageRepository, controller, projects)
            view.saveProjects()
        },

        saveProjects: function () {
            var includedProjects = view.projView().findIncludedProjects()
            controller.saveIncludedProjects(includedProjects)
        },

        addClickHandlers: function () {
            $('#include-all').click(view.projView().includeAll)
            $('#exclude-all').click(view.projView().excludeAll)
            $('#save-success-configuration').click(function(e) { e.preventDefault(); saveSuccessConfiguration(storageRepository, controller) })
            $('#success-text').blur(function () { saveSuccessText(storageRepository, controller) })
            $('#success-image-url').blur(function () { saveAndShowSuccessImage(controller) })

            $("#cctray-url").keypress(function(e) {
                if(e.which == 13) {
                    saveCctray(storageRepository, view.getProjects)
                }
            });

            $("#cctray-fetch").click(function(e) {
                e.preventDefault()
                saveCctray(storageRepository, view.getProjects)
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

function load(storageRepository, postLoadCallback) {
    var settings = config.load()
    $('#cctray-url').val(settings.cctray)
    $('#success-text').val(settings.successText)
    loadSuccessImage(storageRepository, settings);
    if (config.hasCctray()) {
        postLoadCallback()
    }
}

function saveCctray(storageRepository, postLoadCallback) {
    config.save({cctray: $('#cctray-url').val().trim()})
    postLoadCallback()
}

function saveSuccessConfiguration(storageRepository, controller) {
    saveSuccessText(storageRepository, controller)
    saveAndShowSuccessImage(controller)
}

function saveSuccessText(storageRepository, controller) {
    var text = $('#success-text').val()
    controller.saveSuccessText(storageRepository, text)
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

function loadSuccessImage(storageRepository, settings) {
    var imageUrl = settings.successImageUrl
    if (imageUrl) {
        $('#success-image-url').val(imageUrl)
        showSuccessImage(imageUrl)
    }
}

function saveAllProjects(storageRepository, controller, projects) {
    var seenProjects = $.map(projects, function (project) { return project.name })
    controller.saveSeenProjects(seenProjects)
}