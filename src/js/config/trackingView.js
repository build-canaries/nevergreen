var $ = require('jquery')

module.exports = function (controller, trackingRepository, projectsView, configView) {
    var view = {
        init: function () {
            load(trackingRepository, view.getProjects, projectsView.noProjects)
            this.addEventHandlers()
        },

        appendProjects: function (projects, encryptedPassword) {
            projectsView.listProjects(projects)
            saveAllProjects(trackingRepository, projects)
            view.saveProjects()
            if (encryptedPassword) trackingRepository.savePassword(encryptedPassword)
        },

        saveProjects: function () {
            var includedProjects = projectsView.findIncludedProjects()
            trackingRepository.saveIncludedProjects(includedProjects)
        },

        addEventHandlers: function () {
            $('#include-all').click(projectsView.includeAll)
            $('#exclude-all').click(projectsView.excludeAll)
            $("#cctray-url").keypress(function (e) {
                if (e.which == 13) {
                    saveCctray(trackingRepository, view.getProjects)
                }
            });
            $("#cctray-fetch").click(function (e) {
                e.preventDefault()
                saveCctray(trackingRepository, view.getProjects)
            });
        },

        getProjects: function () {
            projectsView.searching()
            var username = $('#username').val()
            trackingRepository.saveUsername(username)
            controller.getProjects(trackingRepository.getCctray(), username, $('#password').val(), view.appendProjects, configView.showSpinner, configView.hideSpinner, configView.errorHandler)
        }

    }
    return view
}

function load(storageRepository, postLoadCallback, noProjectsCallBack) {
    $('#cctray-url').val(storageRepository.getCctray())
    if (storageRepository.hasCctray()) {
        postLoadCallback()
    } else {
        noProjectsCallBack()
    }
}

function saveCctray(storageRepository, postLoadCallback) {
    storageRepository.saveCctray($('#cctray-url').val())
    postLoadCallback()
}

function saveAllProjects(storageRepository, projects) {
    var seenProjects = $.map(projects, function (project) {
        return project.name
    })
    storageRepository.saveSeenProjects(seenProjects)
}