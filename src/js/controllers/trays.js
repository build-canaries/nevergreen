var _ = require('lodash')

function includes(includedProjects, projectName) {
    return _.indexOf(includedProjects, projectName) >= 0
}

function seen(previousProjects, projectName) {
    return _.indexOf(previousProjects, projectName) >= 0
}

function retrieved(retrievedProjects, projectName) {
    return _.indexOf(retrievedProjects, projectName) >= 0
}

function firstTimeSeen(previousProjects, retrievedProjects, projectName) {
    return retrieved(retrievedProjects, projectName) && previousProjects.length > 0 && !seen(previousProjects, projectName)
}

function removed(retrievedProjects, projectName) {
    return !retrieved(retrievedProjects, projectName)
}

function sort(projects) {
    return projects.sort(function (item1, item2) {
        return item1.toLowerCase().localeCompare(item2.toLowerCase())
    })
}

module.exports = {
    projects: function (includedProjects, previousProjects, retrievedProjects) {
        var allProjects = sort(_.union(includedProjects, previousProjects, retrievedProjects))
        return allProjects.map(function (name) {
            return {
                name: name,
                included: includes(includedProjects, name),
                isNew: firstTimeSeen(previousProjects, retrievedProjects, name),
                wasRemoved: removed(retrievedProjects, name)
            }
        }.bind(this))
    },

    requiresAuth: function (tray) {
        return tray.username && tray.password
    }
}
