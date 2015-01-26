var $ = require('jquery')

module.exports = function (controller, storageRepository, projectsView) {
    var view = {
        init: function () {
            load(storageRepository, view.getProjects)
            this.addClickHandlers()
        },

        appendProjects: function (projects) {
            projectsView.listProjects(projects)
            saveAllProjects(storageRepository, projects)
            view.saveProjects()
        },

        saveProjects: function () {
            var includedProjects = projectsView.findIncludedProjects()
            storageRepository.saveIncludedProjects(includedProjects)
        },

        addClickHandlers: function () {
            $('#include-all').click(projectsView.includeAll)
            $('#exclude-all').click(projectsView.excludeAll)
            $('#save-success-configuration').click(function (e) {
                e.preventDefault();
                saveSuccessConfiguration(storageRepository)
            })
            $('#success-text').blur(function () {
                saveSuccessText(storageRepository)
            })
            $('#success-image-url').blur(function () {
                saveAndShowSuccessImage(storageRepository)
            })

            $("#cctray-url").keypress(function (e) {
                if (e.which == 13) {
                    saveCctray(storageRepository, view.getProjects)
                }
            });

            $("#cctray-fetch").click(function (e) {
                e.preventDefault()
                saveCctray(storageRepository, view.getProjects)
            });
        },

        showSpinner: function () {
            $('#loading-modal').addClass('loading')
            $('#spinner').show()
        },

        hideSpinner: function () {
            $('#loading-modal').removeClass('loading')
            $('#spinner').hide()
        },

        errorHandler: function (code, reason) {
            var $projects = $('#projects');
            $projects.empty()
            $projects.append('<h1 class="config-error">Cannot find projects because<br />' + code + ': ' + reason + '</h1>')
        },

        getProjects: function () {
            controller.getProjects(storageRepository.getCctray(), view.appendProjects, view.showSpinner, view.hideSpinner, view.errorHandler)
        }

    }
    return view
}

function load(storageRepository, postLoadCallback) {
    $('#cctray-url').val(storageRepository.getCctray())
    $('#success-text').val(storageRepository.getSuccessText())
    loadSuccessImage(storageRepository);
    if (storageRepository.hasCctray()) {
        postLoadCallback()
    }
}

function saveCctray(storageRepository, postLoadCallback) {
    storageRepository.saveCctray($('#cctray-url').val())
    postLoadCallback()
}

function saveSuccessConfiguration(storageRepository) {
    saveSuccessText(storageRepository)
    saveAndShowSuccessImage(storageRepository)
}

function saveSuccessText(storageRepository) {
    storageRepository.saveSuccessText($('#success-text').val())
}

function saveAndShowSuccessImage(storageRepository) {
    var imageUrl = $('#success-image-url').val()
    storageRepository.saveSuccessImageUrl(imageUrl)
    showSuccessImage(imageUrl)
}

function showSuccessImage(imageUrl) {
    var successImage = $('#success-image');
    successImage.attr('src', imageUrl)
    successImage.removeClass('hidden')
}

function loadSuccessImage(storageRepository) {
    if (storageRepository.hasSuccessImageUrl()) {
        var imageUrl = storageRepository.getSuccessImageUrl()
        $('#success-image-url').val(imageUrl)
        showSuccessImage(imageUrl)
    }
}

function saveAllProjects(storageRepository, projects) {
    var seenProjects = $.map(projects, function (project) {
        return project.name
    })
    storageRepository.saveSeenProjects(seenProjects)
}