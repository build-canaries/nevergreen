var $ = require('jquery')

module.exports = function (successRepository) {
    return {
        addProjects: function (projects) {
            $('#projects').empty()
            projects.forEach(addBuildStatusToScreen)

            if (projects.length === 0) {
                showSuccessMessage(projects, successRepository)
            }
        }
    }
}

function addBuildStatusToScreen(project) {
    $('#projects').append(
        '<li class="monitor-project monitor-' + project.prognosis + '">' +
        '<div class=monitor-outerContainer>' +
        '<div class=monitor-innerContainer>' + project.name +
        '</div>' +
        '</div>' +
        '</li>')
}

function showSuccessMessage(projects, successRepository) {
    if (successRepository.hasSuccessImageUrl()) {
        $('#projects')
            .append('<li><div class=monitor-outerContainer><div id="success-image" class="monitor-innerContainer" style="' +
            'background: url(' + successRepository.getSuccessImageUrl() + ') no-repeat center center fixed;' +
            '-webkit-background-size: cover;' +
            '-moz-background-size: cover;' +
            '-o-background-size: cover;' +
            'background-size: cover;">' +
            '</div>' +
            '</div></li>')
    } else {
        $('#projects').append(
            '<li>' +
            '<div class=monitor-outerContainer>' +
            '<div id="success-text" class=monitor-innerContainer>' + successRepository.getSuccessText() +
            '</div>' +
            '</div>' +
            '</li>')
    }
}