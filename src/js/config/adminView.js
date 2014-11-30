var config = require('./config')
var $ = require('jquery')

module.exports = function (controller) {
    return {
        init: function () {
            load(controller, this.appendProjects)
            addClickHandlers(controller, this.appendProjects)
        },

        appendProjects: function(projects) {
            appendProjects(controller, projects)
            controller.saveAllProjects($.map(projects, function (project) {
                return project.name
            }))
        },

        showSpinner: showSpinner
    }
}

function addClickHandlers(controller, postLoadCallback) {
    $('#cctray-save').click(function() { saveCctray(controller, postLoadCallback) })
    $('#save-projects').click(function() { monitorPage(controller) })
    $('#include-all').click(function() { includeAll(controller) })
    $('#exclude-all').click(function() { excludeAll(controller) })
}

function sortProjectsByName(projects) {
    return projects.sort(function (item1, item2) {
        return item1.name.toLowerCase().localeCompare(item2.name.toLowerCase())
    });
}

function columnClass(index) {
    switch (index % 3) {
        case 0:
            return 'column-left'
            break;
        case 1:
            return 'column-center'
            break;
        case 2:
            return 'column-right'
            break;
    }
}

function appendProjects(controller, projects) {
    var sortedProjects = sortProjectsByName(projects);
    $('#projects').empty()
    $('#projects').append('<ul />')
    sortedProjects.forEach(function (project, index) {
        var included = ''
        if (!config.isReady() || config.includesProject(project.name)) {
            included = 'included'
        }
        var previouslyFetched = ''
        if (!config.previouslyFetched(project.name)) {
            previouslyFetched = ' <sup>new</sup>'
        }
        $('#projects ul').append('<li class="' + included + ' ' + columnClass(index) + ' no-text-selection">' + project.name + previouslyFetched + '</li>')
    })
    $('#projects ul li').click(function () {
        $(this).toggleClass('included')
        saveProjects(controller)
    })
    $('#project-controls').removeClass('hidden')
    $('#success').removeClass('hidden')
}

function load(controller, postLoadCallback) {
    var settings = config.load()
    $('#cctray-url').val(settings.cctray)
    $('#success-text').val(settings.successText)
    if (config.hasCctray()) {
        controller.getProjects(config, postLoadCallback, showSpinner)
    }
}

function saveCctray(controller, postLoadCallback) {
    config.save({cctray: $('#cctray-url').val().trim()})
    controller.getProjects(config, postLoadCallback, showSpinner)
}

function saveSuccessText(controller) {
    var text = $('#success-text').val()
    controller.saveSuccessText(text)
}

function monitorPage(controller) {
    saveSuccessText(controller)
    window.location.replace('/')
}

function saveProjects(controller) {
    var includedProjects = $('#projects ul li.included').map(function (index, element) {
        return $(element).html().replace(' <sup>new</sup>', '') // TODO: is there a better way to do this?
    }).toArray()
    controller.saveIncludedProjects(includedProjects)
}

function includeAll(controller) {
    $('#projects ul li').addClass('included')
    saveProjects(controller)
}

function excludeAll(controller) {
    $('#projects ul li').removeClass('included')
    saveProjects(controller)
}

function showSpinner(shouldShow) {
    if (shouldShow) {
        $('#loading-modal').addClass('loading')
        $('#spinner').show()
    } else {
        $('#loading-modal').removeClass('loading')
        $('#spinner').hide()
    }
}