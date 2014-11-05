function AdminView() {
    var config = new Config();

    this.init = function () {
        load()
        $("#cctray-save").click(saveCctray)
    }

    function load() {
        var settings = config.load()
        $("#cctray-url").val(settings.cctray)
    }

    function saveCctray() {
        config.save({cctray: $("#cctray-url").val()})
        new AdminController(config).getProjects(new AdminController(config).appendProjects)
    }
}