var $ = require('jquery')

module.exports = function (config, projects) {
    return {
        addProjects: function () {
            $('#projects').empty()
            projects.forEach(addBuildStatusToScreen)

            if (projects.length === 0) {
                showSuccessMessage(projects, config)
            }
        }
    }
}

function addBuildStatusToScreen(project) {
    $('#projects')
        .append('<li class="monitor-project monitor-' + project.prognosis + '"><div class=monitor-outerContainer><div class=monitor-innerContainer>' +
        project.name + '</div></div></li>')
}

function showSuccessMessage(projects, config) {
    var settings = config.load()
    var successImageUrl = settings.successImageUrl

    if (successImageUrl) {
        $('#projects')
            .append('<li><div class=monitor-outerContainer><div class=monitor-innerContainer>' +
            '<img id="success-image" src="'+ successImageUrl +'" />' +
            '</div></div></li>')
    } else {
        var successMessage = settings.successText
        $('#projects')
            .append('<li><div class=monitor-outerContainer><div id="success-text" class=monitor-innerContainer>' + successMessage + '</div></div></li>')
    }
}