var $ = require('jquery')

module.exports = {

    listProjects: function (controller, config, projects, saveProjects) {
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
            $('#projects ul').append('<li class="' + included + ' ' + columnClass(index) + ' no-text-selection">' + project.name + previouslyFetched + '</li>')

        })

        $('#projects ul li').click(function () {
            $(this).toggleClass('included')
            saveProjects()
        })
    },

    findIncludedProjects: function () {
        return $('#projects ul li.included').map(function (index, element) {
            return $(element).html().replace(' <sup>new</sup>', '') // TODO: is there a better way to do this?
        }).toArray()
    }

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