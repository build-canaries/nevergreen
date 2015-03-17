var _ = require('lodash')

module.exports = {
    newTray: function (url, username, password, includedProjects, previousProjects, retrievedProjects) {
        return {
            url: url,
            includedProjects: _.isUndefined(includedProjects) ? [] : includedProjects,
            previousProjects: _.isUndefined(previousProjects) ? [] : previousProjects,
            retrievedProjects: _.isUndefined(retrievedProjects) ? [] : retrievedProjects,
            username: username,
            password: password,

            projects: function () {
                var allProjects = sort(_.union(this.includedProjects, this.previousProjects, this.retrievedProjects));
                return allProjects.map(function (name) {
                    return {
                        name: name,
                        included: includes(this, name),
                        isNew: firstTimeSeen(this, name),
                        wasRemoved: removed(this, name)
                    }
                }.bind(this))
            }
        }
    },

    hasAuth: function (tray) {
        return tray.username && tray.password
    }
}

function includes(tray, projectName) {
    return _.indexOf(tray.includedProjects, projectName) >= 0
}

function previouslyRetrieved(tray, projectName) {
    return _.indexOf(tray.previousProjects, projectName) >= 0
}

function retrieved(tray, projectName) {
    return _.indexOf(tray.retrievedProjects, projectName) >= 0
}

function firstTimeSeen(tray, projectName) {
    return retrieved(tray, projectName) && !previouslyRetrieved(tray, projectName)
}

function removed(tray, projectName) {
    return !retrieved(tray, projectName)
}

function sort(projects) {
    return projects.sort(function (item1, item2) {
        return item1.toLowerCase().localeCompare(item2.toLowerCase())
    });
}