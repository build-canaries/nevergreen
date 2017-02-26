import ScaleText from 'scale-text'

// These should match the breakpoints in the CSS
const tablet = 768
const desktop = 1440

// 2 * 0.3em which is the margin added to the project containers via CSS
const containerMargin = 9.6

function columns(parentView) {
  if (parentView.offsetWidth < tablet) {
    return 1
  } else if (parentView.offsetWidth < desktop) {
    return 2
  } else {
    return 3
  }
}

function numberOfColumns(totalNumberOfItems, parentView) {
  return Math.min(columns(parentView), totalNumberOfItems)
}

function numberOfRows(totalNumberOfItems, parentView) {
  return Math.ceil(totalNumberOfItems / columns(parentView))
}

function calculateWidth(totalNumberOfItems, parentView) {
  const columns = numberOfColumns(totalNumberOfItems, parentView)
  return (parentView.offsetWidth - (columns * containerMargin)) / columns
}

function calculateHeight(totalNumberOfItems, parentView) {
  const rows = numberOfRows(totalNumberOfItems, parentView)
  return (parentView.offsetHeight - (rows * containerMargin)) / rows
}

function resizeEachContainer(containers, parentView) {
  const height = calculateHeight(containers.length, parentView)
  const width = calculateWidth(containers.length, parentView)
  Array.from(containers).forEach((container) => {
    container.style.height = `${height}px`
    container.style.width = `${width}px`
  })
}

function getProjectTextFromDOM(containers) {
  return Array.from(containers).map((container) => container.querySelector('.monitor-inner-container').textContent)
}

function scaleFontToContainerSize(listOfText, containers, parentView) {
  const height = calculateHeight(listOfText.length, parentView)
  const width = calculateWidth(listOfText.length, parentView)
  const fontSize = new ScaleText(listOfText, height, width).ideal()

  Array.from(containers).forEach((container) => {
    container.style['font-size'] = `${fontSize}px`
  })
}

export function styleProjects(containers, parentView) {
  resizeEachContainer(containers, parentView)
  scaleFontToContainerSize(getProjectTextFromDOM(containers), containers, parentView)
}

export function styleSuccess(message, containers, parentView) {
  resizeEachContainer(containers, parentView)
  scaleFontToContainerSize([message], containers, parentView)
}
