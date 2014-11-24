function AdminView(controller) {
    var config = new Config();

    this.init = function () {
        load()
        addClickHandlers();
    }

    function addClickHandlers() {
        $('#cctray-save').click(saveCctray)
        $('#save-projects').click(monitorPage)
        $('#include-all').click(includeAll)
        $('#exclude-all').click(excludeAll)
    }

    function sortProjectsByName(projects) {
        return projects.sort(function (item1, item2) {
            return item1.name.toLowerCase().localeCompare(item2.name.toLowerCase())
        });
    }

    function appendProjects(projects) {
        var sortedProjects = sortProjectsByName(projects);
        $('#projects').empty()
        $('#projects').append('<ul />')
        sortedProjects.forEach(function (project) {
            var included = ''
            if (!config.isReady() || config.includesProject(project.name)) {
                included = 'included'
            }
            $('#projects ul').append('<li class="' + included + ' no-text-selection">' + project.name + '</li>')
        })
        $('#projects ul li').click(function () {
            $(this).toggleClass('included')
            saveProjects()
        })
        $('#project-controls').removeClass('hidden')
        $('#success').removeClass('hidden')
    }

    this.appendProjects = appendProjects

    function load() {
        var settings = config.load()
        $('#cctray-url').val(settings.cctray)
        $('#success-text').val(settings.successText)
        if (config.hasCctray()) {
            controller.getProjects(appendProjects, showSpinner)
        }
    }

    function saveCctray() {
        config.save({cctray: $('#cctray-url').val()})
        controller.getProjects(appendProjects, showSpinner)
    }

    function saveSuccessText() {
        var text = $('#success-text').val()
        controller.saveSuccessText(text)
    }

    function monitorPage() {
        saveSuccessText()
        window.location.replace('/')
    }

    function saveProjects() {
        var includedProjects = $('#projects ul li.included').map(function (index, element) {
            return element.textContent
        }).toArray()
        controller.saveIncludedProjects(includedProjects)
    }

    function includeAll() {
        $('#projects ul li').addClass('included')
    }

    function excludeAll() {
        $('#projects ul li').removeClass('included')
    }

    function showSpinner(shouldShow) {
        if (shouldShow) {
            $('#loading-modal').addClass('loading')
            $('#spinner').show()
        } else {
            $('#loading-modal').removeClass('loading')
            $('#spinner').hide()
        }
    }

    this.showSpinner = showSpinner
}
