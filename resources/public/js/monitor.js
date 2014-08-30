var columns = 3
var itemPadding = 10

function widthGiven(itemCount) {
    return window.innerWidth / Math.min(columns, itemCount) - itemPadding
}

function heightGiven(itemCount) {
    return window.innerHeight / Math.ceil(itemCount / columns) - itemPadding
}

function styleListItems() {
    var itemCount = $('li').size()
    $('.outerContainer')
        .height(heightGiven(itemCount))
        .width(widthGiven(itemCount))

    scaleFontToContainerSize()
}

function scaleFontToContainerSize() {
    $(".outerContainer").fitText(1.75)
}

function grabLatestData() {
    $.getJSON("/projects").then(function(data){
        $('#projects').empty()

        data.body.forEach(function(project){
            var buildStatus = project.lastBuildStatus
            if(buildStatus !== "Success"){
                $('#projects').append("<li><div class=outerContainer><div class=innerContainer>" +
                project.name + "</div></div></li>")
            }
        })

        styleListItems()
    })
}

grabLatestData(); // run immediately
setInterval(grabLatestData, 5000);