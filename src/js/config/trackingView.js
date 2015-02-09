var $ = require('jquery')

module.exports = function (controller, trackingRepository, projectsView, configView) {
    var view = {
        init: function () {
            load(trackingRepository, view.getProjects, projectsView.noProjects)
            this.addEventHandlers()
        },

        appendProjects: function (projects) {
            projectsView.listProjects(projects)
            saveAllProjects(trackingRepository, projects)
            view.saveProjects()
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
                getProjectsWithOrWithoutAuthentication(view, trackingRepository);
            });
        },

        getProjects: function () {
            projectsView.searching()
            controller.getProjects(view.appendProjects)
        },

        getProjectsWithUsernameAndPassword: function (response) {
            trackingRepository.saveUsername($('#username').val())
            trackingRepository.savePassword(response.password)
            controller.getProjects(view.appendProjects)
        },

        encryptPasswordAndGetProjects: function() {
            controller.encryptPasswordAndGetProjects($('#password').val(), view.getProjectsWithUsernameAndPassword)
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

function isAuthenticated() {
    var password = $('#password').val()
    var username = $('#username').val()
    return username && password
}

function getProjectsWithOrWithoutAuthentication(view, trackingRepository) {
    if (isAuthenticated()) {
        saveCctray(trackingRepository, view.encryptPasswordAndGetProjects)
    } else {
        saveCctray(trackingRepository, view.getProjects)
    }
}