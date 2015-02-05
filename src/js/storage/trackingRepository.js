module.exports = function (repository) {
    return {
        isReady: function () {
            return this.hasCctray() && this.hasIncludedProjects()
        },

        saveCctray: function (url) {
            repository.save('previousCctray', this.getCctray())
            repository.save('cctray', url)
        },

        getCctray: function () {
            return repository.getOr('cctray', '')
        },

        hasCctray: function () {
            return repository.exists('cctray')
        },

        cctraySeen: function (url) {
            return url.trim() === repository.getOr('previousCctray', '')
        },

        saveIncludedProjects: function (projects) {
            repository.save('includedProjects', projects)
        },

        getIncludedProjects: function () {
            return repository.getArrayOr('includedProjects', [])
        },

        includesProject: function (projectName) {
            return arrayContains(projectName, this.getIncludedProjects())
        },

        hasIncludedProjects: function () {
            return repository.exists('includedProjects')
        },

        saveSeenProjects: function (projects) {
            repository.save('seenProjects', projects)
        },

        getSeenProjects: function () {
            return repository.getArrayOr('seenProjects', [])
        },

        projectSeen: function (projectName) {
            return arrayContains(projectName, this.getSeenProjects())
        },

        saveServerType: function (type) {
            repository.save('serverType', type)
        },

        getServerType: function () {
            return repository.getOr('serverType', '')
        },

        saveUsername: function (username) {
            return repository.save('username', username)
        },

        getUsername: function () {
            return repository.getOr('username', '')
        }
    }
}

function arrayContains(needle, arraystack) {
    return (arraystack !== null && arraystack.indexOf(needle) > -1);
}