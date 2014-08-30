function Styler() {
    this.maxColumns = 3
    this.buildStatusPadding = 10
    this.fontResizeFactor = 1.6

    function buildStatusCount() {
        return $('li').size()
    }

    function numberOfColumns() {
        return Math.min(maxColumns, buildStatusCount())
    }

    function numberOfRows() {
        return Math.ceil(buildStatusCount() / maxColumns)
    }

    function buildStatusWidth() {
        return window.innerWidth / numberOfColumns() - buildStatusPadding
    }

    function buildStatusHeight() {
        return window.innerHeight / numberOfRows() - buildStatusPadding
    }

    function scaleFontToContainerSize() {
        $(".outerContainer").fitText(fontResizeFactor)
    }

    this.styleListItems = function () {
        $('.outerContainer').height(buildStatusHeight()).width(buildStatusWidth())
        scaleFontToContainerSize()
    }
}

function StatusAppender(projects) {
    this.projects = projects

    function addBuildStatusToScreen(project) {
        var buildStatus = project.lastBuildStatus
        if(buildStatus !== "Success"){
            $('#projects').append("<li><div class=outerContainer><div class=innerContainer>" +
            project.name + "</div></div></li>")
        }
    }

    this.addListItems = function() {
        $('#projects').empty()
        projects.forEach(addBuildStatusToScreen)
    }
}

function updateBuildMonitor() {
    $.getJSON("/projects").then(function(data){
        new StatusAppender(data.body).addListItems()
        new Styler().styleListItems()
    })
}

updateBuildMonitor() // run immediately
setInterval(updateBuildMonitor, 5000)