module.exports = {

    save: function (settings) {
        localStorage.setItem('cctray', settings.cctray)
    },

    load: function () {
        var projects = localStorage.getItem('includedProjects');
        var allProjects = localStorage.getItem('allProjects');
        return {
            cctray: localStorage.getItem('cctray'),
            successText: localStorage.hasOwnProperty('successText') ? localStorage.getItem('successText') : '=(^.^)=',
            includedProjects: projects === null ? null : projects.split(','),
            projectsOnLastFetch: allProjects === null ? null : allProjects.split(',')
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