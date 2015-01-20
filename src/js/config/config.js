module.exports = {

    save: function (settings) {
        localStorage.setItem('cctray', settings.cctray)
    },

    load: function () {
        var projects = localStorage.getItem('includedProjects');
        var seenProjects = localStorage.getItem('seenProjects');
        return {
            cctray: localStorage.hasOwnProperty('cctray') ? localStorage.getItem('cctray') : 'https://builds.apache.org/cc.xml',
            successText: localStorage.hasOwnProperty('successText') ? localStorage.getItem('successText') : '=(^.^)=',
            successImageUrl: localStorage.hasOwnProperty('successImageUrl') ? localStorage.successImageUrl : null,
            includedProjects: projects === null ? null : projects.split(','),
            serverType: localStorage.hasOwnProperty('serverType') ? localStorage.serverType : "",
            projectsOnLastFetch: seenProjects === null ? null : seenProjects.split(',')
        }
    },

    isReady: function () {
        return this.hasCctray() && localStorage.hasOwnProperty('includedProjects')
    },

    hasCctray: function () {
        return localStorage.hasOwnProperty('cctray')
    },

    includesProject: function (projectName) {
        var projects = localStorage.getItem('includedProjects').split(',')
        return arrayContains(projectName, projects)
    },

    previouslyFetched: function (projectName) {
        return arrayContains(projectName, this.load().projectsOnLastFetch)
    }
}

function arrayContains(needle, arraystack) {
    return (arraystack !== null && arraystack.indexOf(needle) > -1);
}