var _ = require('lodash')

function includes(tray, projectName) {
    return _.indexOf(tray.includedProjects, projectName) >= 0
}

function seen(tray, projectName) {
    return _.indexOf(tray.previousProjects, projectName) >= 0
}

function retrieved(retrievedProjects, projectName) {
    return _.indexOf(retrievedProjects, projectName) >= 0
}

function firstTimeSeen(tray, retrievedProjects, projectName) {
    return retrieved(retrievedProjects, projectName) && tray.previousProjects.length > 0 && !seen(tray, projectName)
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
    projects: function (tray, retrievedProjects) {
        var allProjects = sort(_.union(tray.includedProjects, tray.previousProjects, retrievedProjects))
        return allProjects.map(function (name) {
            return {
                name: name,
                included: includes(tray, name),
                isNew: firstTimeSeen(tray, retrievedProjects, name),
                wasRemoved: removed(retrievedProjects, name)
            }
        }.bind(this))
    },

    requiresAuth: function (tray) {
        return tray.username && tray.password
    }
}
