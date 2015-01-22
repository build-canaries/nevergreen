var $ = require('jquery')
var ScaleText = require('scale-text')

var projectBoxHeight = 42 // Ideally we'd get this from the page, but we don't know if the text is wrapping already
var maximumProjectNameFontSize = 21

module.exports = function (saveProjects) {
    return {
        listProjects: function (storageRepository, config, projects) {
            $('#projects').empty()

            var sortedProjects = sortProjectsByName(projects)

            sortedProjects.forEach(function (project) {
                var included = ''
                if (!config.isReady() || config.includesProject(project.name)) {
                    included = 'checked'
                }

                var newNote = ''
                if (!config.firstLoad($('#cctray-url').val().trim()) && !config.previouslyFetched(project.name)) {
                    newNote = ' <sup class="config-new-project">new</sup>'
                }

                $('#projects').append('<p class="tracking-cctray-group-build-item"> ' +
                ' <label class="label-checkbox"> '+
                ' <input class="checkbox no-text-selection" type="checkbox" data-name="' + project.name + '" title="" ' + included + '> ' +
                project.name + newNote +
                ' </label> ' +
                ' </p>')

                calculateCorrectFontSize(projects);
            })

            $('#projects input').click(function () {
                saveProjects()
            })
        },

        includeAll: function () {
            $('#projects input').prop('checked', true)
            saveProjects()
        },

        excludeAll: function () {
            $('#projects input').prop('checked', false)
            saveProjects()
        },

        findIncludedProjects: function () {
            return $('#projects input:checked').map(function (index, element) {
                return $(element).attr('data-name')
            }).toArray()
        }
    }
}

function sortProjectsByName(projects) {
    return projects.sort(function (item1, item2) {
        return item1.name.toLowerCase().localeCompare(item2.name.toLowerCase())
    });
}

function calculateCorrectFontSize() {
    var width = $('£projects').width()
    $('#projects > .checkbox').each(function (index, value) {
        var text = [value.textContent]
        var ideal = new ScaleText(text, projectBoxHeight, width).singleLineIdeal()
        var idealCssFontSize = Math.min(ideal, maximumProjectNameFontSize)
        $(value).css('font-size', idealCssFontSize)
    })
}
