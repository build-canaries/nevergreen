import $ from 'jquery'
import ScaleText from 'scale-text'

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

function resizeEachContainer(projects, $containers, $view) {
  $containers
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

function scaleFontToContainerSize(projects, $containers, $view) {
  $containers.css('font-size', new ScaleText(
    everyPieceOfTextOnTheScreen(projects, $containers),
    buildStatusHeight(projects, $view),
    buildStatusWidth(projects, $view)).ideal())
}

module.exports = {
  styleProjects(projects, containers, view) {
    const $containers = $(containers)
    const $view = $(view)
    resizeEachContainer(projects, $containers, $view)
    scaleFontToContainerSize(projects, $containers, $view)
  }
}
