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

function styleListItems() {
    $('.outerContainer').height(buildStatusHeight()).width(buildStatusWidth())
    scaleFontToContainerSize()
}

function addBuildStatusToScreen(project) {
    var buildStatus = project.lastBuildStatus
    if(buildStatus !== "Success"){
        $('#projects').append("<li><div class=outerContainer><div class=innerContainer>" +
        project.name + "</div></div></li>")
    }
}

function addListItems(data) {
    $('#projects').empty()
    data.body.forEach(addBuildStatusToScreen)
}

function updateBuildMonitor() {
    $.getJSON("/projects").then(function(data){
        addListItems(data)
        styleListItems()
    })
}

updateBuildMonitor() // run immediately
setInterval(updateBuildMonitor, 5000)