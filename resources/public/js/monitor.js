function Styler() {
    var maxColumns = 3
    var buildStatusPadding = 10
    var fontResizeFactor = 1.6

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

    this.styleProjects = function () {
        $('.outerContainer').height(buildStatusHeight()).width(buildStatusWidth())
        scaleFontToContainerSize()
    }
}

function StatusAppender(projects) {
    function addBuildStatusToScreen(project) {
        $('#projects')
         .append("<li class=" + project.prognosis + "><div class=outerContainer><div class=innerContainer>" +
          project.name + "</div></div></li>")
    }

    this.addProjects = function() {
        $('#projects').empty()
        projects.forEach(addBuildStatusToScreen)
        if(projects.length === 0) {
            $('#projects')
                .append("<li><div class=outerContainer><div class=innerContainer>Status Cats will return shortly =(^.^)= ...</div></div></li>")
        }
    }
}

function Updater(frequency) {
    function updateBuildMonitor() {
        $.getJSON("/projects").then(function(data){
            new StatusAppender(data.body).addProjects()
            new Styler().styleProjects()
        })
    }

    this.start = function() {
        updateBuildMonitor() // run immediately
        setInterval(updateBuildMonitor, frequency)
    }
}

var fiveSeconds = 5000
new Updater(fiveSeconds).start()