var $ = require('jquery')
var ScaleText = require('scale-text')

module.exports = function (saveProjects) {
    return {
        listProjects: function (config, projects) {
            $('#projects').empty()

            var sortedProjects = sortProjectsByName(projects);

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

                $('#projects ul').append('<li class="' + included + ' no-text-selection">' + project.name + previouslyFetched + '</li>')
                $('li').css('font-size',
                    new ScaleText(
                        everyPieceOfTextOnTheScreen(projects),
                        40,
                        $('ul').width() * 0.46).singleLineIdeal())
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

function everyPieceOfTextOnTheScreen(projects) {
    return $.map(projects, function (project) { return project.name })
}

function sortProjectsByName(projects) {
    return projects.sort(function (item1, item2) {
        return item1.name.toLowerCase().localeCompare(item2.name.toLowerCase())
    });
}