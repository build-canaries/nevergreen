var $ = require('jquery')

module.exports = function (successRepository, successMessage) {
    return {
        addProjects: function (projects) {
            if (projects.length === 0) {
                showSuccess(successRepository, successMessage)
            } else {
                $projects().empty()
                projects.forEach(addBuildStatusToScreen)
            }
        },

        showError: function (message) {
            $projects().empty()
            showErrorMessage(message)
        }
    }
}

function addBuildStatusToScreen(project) {
    $projects().append(
        '<li class="monitor-project monitor-' + project.prognosis + '">' +
        '<div class=monitor-outerContainer>' +
        '<div class=monitor-innerContainer>' + project.name +
        '</div>' +
        '</div>' +
        '</li>')
}

function showSuccess(successRepository, successMessage) {
    if (!successMessageDisplayed()) {
        $projects().empty()
        var message = randomFrom(successRepository.getSuccessMessages())
        successMessage.ifImage(message, showSuccessImage, showSuccessMessage)
    }
}

function showSuccessImage(url) {
    $projects().append(
        '<li>' +
        '<div class="monitor-outerContainer">' +
        '<div id="success-image" class="monitor-success-image monitor-innerContainer" style="background: url(' + url + ') no-repeat center center fixed; background-size: contain"></div>' +
        '</div>' +
        '</li>')
}

function showSuccessMessage(message) {
    $projects().append(
        '<li>' +
        '<div class="monitor-outerContainer">' +
        '<div id="success-text" class="monitor-innerContainer">' + message + '</div>' +
        '</div>' +
        '</li>')
}

function showErrorMessage(message) {
    $projects().append(
        '<li>' +
        '<div class="monitor-outerContainer">' +
        '<div id="success-text" class="monitor-innerContainer">Cannot find projects because ' + message + '</div>' +
        '</div>' +
        '</li>')
}

function successMessageDisplayed() {
    return $('#success-image').length !== 0 || $('#success-text').length !== 0
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function $projects() {
    return $('#interesting-projects');
}