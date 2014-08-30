var columns = 3
var itemPadding = 10

function numberOfColumns() {
    var buildStatusCount = $('li').size()
    return Math.min(columns, $('li').size())
}

function numberOfRows() {
    var buildStatusCount = $('li').size()
    return Math.ceil(buildStatusCount / columns)
}

function buildStatusWidth() {
    return window.innerWidth / numberOfColumns() - itemPadding
}

function buildStatusHeight() {
    return window.innerHeight / numberOfRows() - itemPadding
}

function styleListItems() {
    $('.outerContainer').height(buildStatusHeight()).width(buildStatusWidth())
    scaleFontToContainerSize()
}

function scaleFontToContainerSize() {
    $(".outerContainer").fitText(1.75)
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