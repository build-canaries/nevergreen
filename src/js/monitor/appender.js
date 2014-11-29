var $ = require('jquery')

module.exports = function (config, projects) {
    return {
        addProjects: function () {
            $('#projects').empty()
            projects.forEach(addBuildStatusToScreen)

            if (projects.length === 0) {
                showSuccessMessage(projects, config);
            }
        }
    }
}

function addBuildStatusToScreen(project) {
    $('#projects')
        .append('<li class=' + project.prognosis + '><div class=outerContainer><div class=innerContainer>' +
        project.name + '</div></div></li>')
}

function showSuccessMessage(projects, config) {
    var successMessage = config.load().successText
    $('#projects')
        .append('<li><div class=outerContainer><div class=innerContainer>' + successMessage + '</div></div></li>')
}