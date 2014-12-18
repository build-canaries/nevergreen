var $ = require('jquery')
var ScaleText = require('scale-text')

var projectBoxHeight = 42
var projectBoxWidthFactor = 0.99

module.exports = function (saveProjects) {
    return {
        listProjects: function (config, projects) {
            $('#projects').empty()

            var sortedProjects = sortProjectsByName(projects);

            $('#projects').append('<ul />')
            sortedProjects.forEach(function (project) {
                var included = ''
                if (!config.isReady() || config.includesProject(project.name)) {
                    included = 'included'
                }

                var newNote = ''
                var newNoteClass = ''
                if (!config.previouslyFetched(project.name)) {
                    newNote = ' <sup>new</sup>'
                    newNoteClass = ' new '
                }

                $('#projects ul').append('<li class="' + included + newNoteClass + ' no-text-selection">' + project.name + newNote + '</li>')

                calculateCorrectFontSize(projects);
            })

            $('#projects ul li').click(function () {
                $(this).toggleClass('included')
                saveProjects()
            })
        },

        includeAll: function () {
            $('#projects ul li').addClass('included')
            saveProjects()
        },

        findIncludedProjects: function () {
            return $('#projects ul li.included').map(function (index, element) {
                return $(element).html().replace(' <sup>new</sup>', '') // TODO: is there a better way to do this?
            }).toArray()
        },

        excludeAll: function () {
            $('#projects ul li').removeClass('included')
            saveProjects()
        }
    }
}

function sortProjectsByName(projects) {
    return projects.sort(function (item1, item2) {
        return item1.name.toLowerCase().localeCompare(item2.name.toLowerCase())
    });
}

function calculateCorrectFontSize() {
    var width = $('ul').width() * projectBoxWidthFactor
    $('li').each(function(index, value) {
        var text = [value.textContent]
        var ideal = new ScaleText(text, projectBoxHeight, width).singleLineIdeal()
        var idealCssFontSize = Math.min(ideal, 21)
        $(value).css('font-size', idealCssFontSize)
    })
}
