function Styler() {
    var maxColumns = 3
    var buildStatusPadding = 10

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
        return window.innerWidth / numberOfColumns() - (buildStatusPadding * 2)
    }

    function buildStatusHeight() {
        return window.innerHeight / numberOfRows() - buildStatusPadding
    }

    function scaleFontToContainerSize() {
        $('.outerContainer').css('font-size',
           new FontScaler(
               $.makeArray($('li div div').map(function(index, item) { return $(item).text()})),
               buildStatusHeight(),
               buildStatusWidth()).ideal()
        )
    }

    this.styleProjects = function () {
        $('.outerContainer').height(buildStatusHeight()).width(buildStatusWidth())
        scaleFontToContainerSize()
    }
}

function StatusAppender(projectsList) {
    this.projects = projectsList
    function addBuildStatusToScreen(project) {
        $('#projects')
         .append('<li class=' + project.prognosis + '><div class=outerContainer><div class=innerContainer>' +
          project.name + '</div></div></li>')
    }

    this.addProjects = function(config) {
        $('#projects').empty()
        this.projects.forEach(addBuildStatusToScreen)

        if(this.projects.length === 0) {
            var cat = config.load().successText
            $('#projects')
                .append('<li><div class=outerContainer><div class=innerContainer>' + cat + '</div></div></li>')
        }
    }
}

function Updater(frequency, config) {
    function updateBuildMonitor() {
        if (config.isReady()) {
            $.post('/api/projects', config.load(), function (data) {
                new StatusAppender(data).addProjects(config)
                new Styler().styleProjects()
            }, 'json')
        } else {
            window.location.replace('config')
        }
    }

    this.start = function() {
        updateBuildMonitor() // run immediately
        setInterval(updateBuildMonitor, frequency)
    }
}

function start() {
    var fiveSeconds = 5000
    new Updater(fiveSeconds, new Config()).start()
}
