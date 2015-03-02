var $ = require('jquery')
var ScaleText = require('scale-text')

module.exports = {
    styleProjects: function (projects, $container) {
        resizeEachContainer(projects, $container)
        scaleFontToContainerSize(projects, $container)
    }
}

function resizeEachContainer(projects, $container) {
    $container
        .height(buildStatusHeight(projects))
        .width(buildStatusWidth(projects))
}

var maxColumns = 3
var buildStatusPadding = 11

function numberOfColumns(projects) {
    return Math.min(maxColumns, projects.length)
}

function numberOfRows(projects) {
    return Math.ceil(projects.length / maxColumns)
}

function buildStatusWidth(projects) {
    return window.innerWidth / numberOfColumns(projects) - buildStatusPadding
}

function buildStatusHeight(projects) {
    return window.innerHeight / numberOfRows(projects) - buildStatusPadding
}

function everyPieceOfTextOnTheScreen(projects) {
    return projects.map(function (project) {
        return project.name
    })
}

function scaleFontToContainerSize(projects, $container) {
    $container.css('font-size',
        new ScaleText(
            everyPieceOfTextOnTheScreen(projects),
            buildStatusHeight(projects),
            buildStatusWidth(projects)).ideal()
    )
}