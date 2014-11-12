function Config() {

    this.save = function (settings) {
        localStorage.setItem("cctray", settings.cctray)
    }

    this.load = function () {
        return {
            cctray: localStorage.getItem("cctray"),
            includedProjects: localStorage.getItem("includedProjects").split(",")
        }
    }

    this.isReady = function () {
        return localStorage.hasOwnProperty("cctray")
    }
}
