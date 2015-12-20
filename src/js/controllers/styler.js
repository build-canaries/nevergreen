const ScaleText = require('scale-text')

const maxColumns = 3
const buildStatusPadding = 11

function numberOfColumns(projects) {
  return Math.min(maxColumns, projects.length)
}

function numberOfRows(projects) {
  return Math.ceil(projects.length / maxColumns)
}

function buildStatusWidth(projects, $view) {
  return $view.innerWidth() / numberOfColumns(projects) - buildStatusPadding
}

function buildStatusHeight(projects) {
  return window.innerHeight / numberOfRows(projects) - buildStatusPadding
}

function resizeEachContainer(projects, $container, $view) {
  $container
    .height(buildStatusHeight(projects, $view))
    .width(buildStatusWidth(projects, $view))
}

function getProjectNames(projects) {
  return projects.map(project => {
    return project.name
  })
}

function everyPieceOfTextOnTheScreen(projects, $container) {
  const allTheTextInContainers = []
  $container.find('.monitor-inner-container').each((_, elem) => {
    allTheTextInContainers.push(elem.textContent)
  })
  return allTheTextInContainers.length > 0 ? allTheTextInContainers : getProjectNames(projects)
}

function scaleFontToContainerSize(projects, $container, $view) {
  $container.css('font-size', new ScaleText(
    everyPieceOfTextOnTheScreen(projects, $container),
    buildStatusHeight(projects, $view),
    buildStatusWidth(projects, $view)).ideal())
}

module.exports = {
  styleProjects(projects, $container, $view) {
    resizeEachContainer(projects, $container, $view)
    scaleFontToContainerSize(projects, $container, $view)
  }
}
