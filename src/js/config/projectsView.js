var $ = require('jquery')

module.exports = function (trackingRepository) {
    var view = {

        noProjects: function() {
            $("#hello-text").removeClass('visuallyhidden')
            $("#projects-controls").addClass('visuallyhidden')
        },

        searching: function() {
            $("#hello-text").addClass('visuallyhidden')
            $("#projects-controls").removeClass('visuallyhidden')
        },

        listProjects: function (projects) {
            $('#projects').empty()
            view.searching()

            var previouslyLoaded = trackingRepository.cctraySeen($('#cctray-url').val())
            sortProjectsByName(projects).forEach(function (project) {
               view.addProject(project, previouslyLoaded)
            })
        },

        addProject: function(project, previouslyLoaded) {
            var included = ''
            if (projectIsSelected(trackingRepository, project)) {
                included = 'checked'
            }

            var newNote = ''
            if (projectIsBrandNew(previouslyLoaded, trackingRepository, project.name)) {
                newNote = ' <sup class="config-new-project">new</sup>'
            }

            var $projects = $('#projects')
            $projects.append(
                '<p class="tracking-cctray-group-build-item">' +
                '<label class="label-checkbox">' +
                '<input class="checkbox no-text-selection" type="checkbox" data-name="' + project.name + '" title="" ' + included + '> ' + project.name + newNote +
                '</label>' +
                '</p>')


            $projects.find('input[data-name="' + project.name + '"]').click(function () {
                trackingRepository.saveIncludedProjects(view.findIncludedProjects())
            })
        },

        includeAll: function () {
            $('#projects').find('input').prop('checked', true)
            trackingRepository.saveIncludedProjects(view.findIncludedProjects())
        },

        excludeAll: function () {
            $('#projects').find('input').prop('checked', false)
            trackingRepository.saveIncludedProjects(view.findIncludedProjects())
        },

        findIncludedProjects: function () {
            return $('#projects').find('input:checked').map(function (index, element) {
                return $(element).attr('data-name')
            }).toArray()
        }
    }
    return view
}

function projectIsSelected(trackingRepository, project) {
    return !trackingRepository.isReady() || trackingRepository.includesProject(project.name);
}

function projectIsBrandNew(previouslyLoaded, trackingRepository, projectName) {
    return previouslyLoaded && !trackingRepository.projectSeen(projectName);
}

function sortProjectsByName(projects) {
    return projects.sort(function (item1, item2) {
        return item1.name.toLowerCase().localeCompare(item2.name.toLowerCase())
    });
}

