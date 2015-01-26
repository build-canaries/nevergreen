var $ = require('jquery')
var ScaleText = require('scale-text')

var projectBoxHeight = 42 // Ideally we'd get this from the page, but we don't know if the text is wrapping already
var maximumProjectNameFontSize = 21

module.exports = function (storageRepository) {
    var view = {
        listProjects: function (projects) {
            var $projects = $('#projects');
            $projects.empty()

            var previouslyLoaded = storageRepository.cctraySeen($('#cctray-url').val())
            var sortedProjects = sortProjectsByName(projects)

            sortedProjects.forEach(function (project) {
                var included = ''
                if (!storageRepository.isReady() || storageRepository.includesProject(project.name)) {
                    included = 'checked'
                }

                var newNote = ''
                if (previouslyLoaded && !storageRepository.projectSeen(project.name)) {
                    newNote = ' <sup class="config-new-project">new</sup>'
                }

                $projects.append(
                    '<p class="tracking-cctray-group-build-item">' +
                    '<label class="label-checkbox">' +
                    '<input class="checkbox no-text-selection" type="checkbox" data-name="' + project.name + '" title="" ' + included + '> ' + project.name + newNote +
                    '</label>' +
                    '</p>')

                calculateCorrectFontSize(projects);
            })

            $projects.find('input').click(function () {
                storageRepository.saveIncludedProjects(view.findIncludedProjects())
            })
        },

        includeAll: function () {
            $('#projects').find('input').prop('checked', true)
            storageRepository.saveIncludedProjects(view.findIncludedProjects())
        },

        excludeAll: function () {
            $('#projects').find('input').prop('checked', false)
            storageRepository.saveIncludedProjects(view.findIncludedProjects())
        },

        findIncludedProjects: function () {
            return $('#projects').find('input:checked').map(function (index, element) {
                return $(element).attr('data-name')
            }).toArray()
        }
    }
    return view
}

function sortProjectsByName(projects) {
    return projects.sort(function (item1, item2) {
        return item1.name.toLowerCase().localeCompare(item2.name.toLowerCase())
    });
}

function calculateCorrectFontSize() {
    var $projects = $('#projects');
    var width = $projects.width()
    $projects.find('.checkbox').each(function (index, value) {
        var text = [value.textContent]
        var ideal = new ScaleText(text, projectBoxHeight, width).singleLineIdeal()
        var idealCssFontSize = Math.min(ideal, maximumProjectNameFontSize)
        $(value).css('font-size', idealCssFontSize)
    })
}
