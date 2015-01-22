module.exports = {
    saveCctray: function (url) {
        localStorage.setItem('cctray', url.trim())
    },

    getCctray: function () {
        return getOr('cctray', '')
    },

    hasCctray: function () {
        return exists('cctray')
    },

    saveIncludedProjects: function (projects) {
        localStorage.setItem('includedProjects', projects)
    },

    getIncludedProjects: function () {
        return this.hasIncludedProjects() ? localStorage.getItem('includedProjects').split(',') : []
    },

    includesProject: function (projectName) {
        return arrayContains(projectName, this.getIncludedProjects())
    },

    hasIncludedProjects: function () {
        return localStorage.hasOwnProperty('includedProjects')
    },

    saveSuccessText: function (text) {
        localStorage.setItem('successText', text.trim())
    },

    getSuccessText: function () {
        return getOr('successText', '')
    },

    saveSuccessImageUrl: function (url) {
        localStorage.setItem('successImageUrl', url.trim())
    },

    getSuccessImageUrl: function () {
        return getOr('successImageUrl', '')
    },

    hasSuccessImageUrl: function () {
        return exists('successImageUrl')
    },

    saveSeenProjects: function (projects) {
        localStorage.setItem('seenProjects', projects)
    },

    getSeenProjects: function () {
        var seenProjects = localStorage.getItem('seenProjects')
        return seenProjects === null ? [] : seenProjects.split(',')
    },

    saveServerType: function (type) {
        localStorage.setItem('serverType', type.trim())
    },

    getServerType: function () {
        return getOr('serverType', '')
    }
}

function exists(key) {
    var val = localStorage.getItem(key)
    return val && val.trim().length !== 0
}

function getOr(key, defaultValue) {
    return exists(key) ? localStorage.getItem(key) : defaultValue
}

function arrayContains(needle, arraystack) {
    return (arraystack !== null && arraystack.indexOf(needle) > -1);
}