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
  $('li')
    .height(heightGiven(itemCount))
    .width(widthGiven(itemCount))
    .css('line-height', heightGiven(itemCount) + 'px');
}

function grabLatestData() {
    $.getJSON("/projects").then(function(data){
        $('#projects').empty()

        data.body.forEach(function(project){
            var buildStatus = project.lastBuildStatus
            if(buildStatus !== "Success"){
                var item = $('#projects').append('<li>' + project.name +'</li>')
            }
        })

        styleListItems()
    })
}

grabLatestData(); // run immediately
setInterval(grabLatestData, 5000);