var $ = require('jquery')
var ScaleText = require('scale-text')

module.exports = {
    styleProjects: function () {
        resizeEachContainer()
        scaleFontToContainerSize()
    }
}

function resizeEachContainer() {
    $('.outerContainer')
        .height(buildStatusHeight())
        .width(buildStatusWidth())
}

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

function everyPieceOfTextOnTheScreen() {
    return $.makeArray($('li div div').map(function (index, item) {
        return $(item).text()
    }));
}
function scaleFontToContainerSize() {
    $('.outerContainer').css('font-size',
        new ScaleText(
            everyPieceOfTextOnTheScreen(),
            buildStatusHeight(),
            buildStatusWidth()).ideal()
    )
}