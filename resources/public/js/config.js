function Config() {

    this.save = function (settings) {
        localStorage.setItem('cctray', settings.cctray)
    }

    this.load = function () {
        var projects = localStorage.getItem('includedProjects');
        return {
            cctray: localStorage.getItem('cctray'),
            successText: localStorage.hasOwnProperty('successText') ? localStorage.getItem('successText') : '=(^.^)=',
            includedProjects: projects === null ? null : projects.split(',')
        }
    }

    this.isReady = function () {
        return this.hasCctray() && localStorage.hasOwnProperty('includedProjects')
    }

    this.hasCctray = function () {
        return localStorage.hasOwnProperty('cctray')
    }

    this.includesProject = function (projectName) {
        var projects = localStorage.getItem('includedProjects').split(',');
        return arrayContains(projectName, projects)
    }

    function arrayContains(needle, arrhaystack) {
        return (arrhaystack.indexOf(needle) > -1);
    }
}
