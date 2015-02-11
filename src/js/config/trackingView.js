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
            if (trackingRepository.isAuthenticated()){
                $('#password').val(trackingRepository.getPassword())
            }
        },

        saveProjects: function () {
            var includedProjects = projectsView.findIncludedProjects()
            trackingRepository.saveIncludedProjects(includedProjects)
        },

        addEventHandlers: function () {
            $('#include-all').click(projectsView.includeAll)
            $('#exclude-all').click(projectsView.excludeAll)
            $('#cctray-url').keypress(function (e) {
                if (e.which == 13) {
                    saveCctray(trackingRepository, view.getProjects)
                }
            })
            $('#cctray-fetch').click(function (e) {
                e.preventDefault()
                getProjectsWithOrWithoutAuthentication(view, trackingRepository);
            })
            $('#is-authenticated').click(function () {
                showAuthenticationControls(trackingRepository);
            })
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

        encryptPasswordAndGetProjects: function () {
            controller.encryptPasswordAndGetProjects($('#password').val(), view.getProjectsWithUsernameAndPassword)
        }

    }
    return view
}

function showAuthenticationGroup(storageRepository) {
    $('#authentication-group').removeClass('visuallyhidden')
    $('#username').val(storageRepository.getUsername())
    $('#password').val(storageRepository.getPassword())
}

function load(storageRepository, postLoadCallback, noProjectsCallBack) {
    $('#cctray-url').val(storageRepository.getCctray())
    if (storageRepository.hasCctray()) {
        postLoadCallback()
    } else {
        noProjectsCallBack()
    }

    if (storageRepository.isAuthenticated()) {
        document.getElementById('is-authenticated').checked = true
        showAuthenticationGroup(storageRepository);
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

function passwordIsNotEncrypted(storageRepository) {
    return $('#password').val() != storageRepository.getPassword()
}

function getProjectsWithOrWithoutAuthentication(view, storageRepository) {
    if (storageRepository.isAuthenticated() && passwordIsNotEncrypted(storageRepository)) {
        saveCctray(storageRepository, view.encryptPasswordAndGetProjects)
    } else {
        saveCctray(storageRepository, view.getProjects)
    }
}

function showAuthenticationControls(storageRepository) {
    var isAuthenticated = document.getElementById('is-authenticated').checked
    storageRepository.setIsAuthenticated(isAuthenticated)
    if (isAuthenticated) {
        showAuthenticationGroup(storageRepository)
    } else {
        $('#authentication-group').addClass('visuallyhidden')
        storageRepository.clearAuthDetails()
    }
}