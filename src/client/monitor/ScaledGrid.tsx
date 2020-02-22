import React, {Children, ReactNode, useCallback, useLayoutEffect, useRef} from 'react'
import {ideal} from './ScaleText'
import {FontMetrics, Measurable} from './FontMetrics'
import {flatten, isNil, join, map, trim} from 'lodash'
import styles from './scaled-grid.scss'
import {VISUALLY_HIDDEN_ATTRIBUTE} from '../common/VisuallyHidden'
import {useResizable} from '../common/ResizableHook'

interface ScaledGridProps {
  readonly children: ReactNode;
}

export const SCALE_ATTRIBUTE = 'data-scale'

const PADDING = 0.5 // em

// These need to match those in the CSS
const TABLET_BREAKPOINT = 768 // px
const DESKTOP_BREAKPOINT = 1440 // px

function columns(width: number) {
  if (width < TABLET_BREAKPOINT) {
    return 1
  } else if (width < DESKTOP_BREAKPOINT) {
    return 2
  } else {
    return 3
  }
}

function numberOfRows(totalNumberOfItems: number, width: number) {
  return Math.ceil(totalNumberOfItems / columns(width))
}

function numberOfColumns(totalNumberOfItems: number, width: number) {
  return Math.min(columns(width), totalNumberOfItems)
}

function calculateChildWidth(totalNumberOfItems: number, width: number) {
  const columns = numberOfColumns(totalNumberOfItems, width)
  return Math.floor(width / columns)
}

function calculateChildHeight(totalNumberOfItems: number, width: number, height: number) {
  const rows = numberOfRows(totalNumberOfItems, width)
  const calculated = Math.floor(height / rows)
  return Math.max(calculated, 1)
}

function updateChildSizes(parent: Element) {
  const children = Array.from(parent.childNodes) as Element[]
  const widthPx = calculateChildWidth(children.length, parent.clientWidth)
  const heightPx = calculateChildHeight(children.length, parent.clientWidth, parent.clientHeight)

  // the size needs to be set before we try and calculate the font size
  children.forEach((e) => {
    e.setAttribute('style', `width: ${widthPx}px; min-height: ${heightPx}px`)
  })
}

function getVisibleChildren(node: Element): ReadonlyArray<Element> {
  if (node.hasChildNodes()) {
    return flatten((Array.from(node.childNodes) as Element[])
      .filter((node) => node.nodeName === '#text' || !node.hasAttribute(VISUALLY_HIDDEN_ATTRIBUTE))
      .map(getVisibleChildren))
  }
  return [node]
}

function getVisibleText(node: Element) {
  return join(map(getVisibleChildren(node), (n) => trim(n.textContent as string)), '')
}

function updateChildFontSize(fontMetrics: Measurable, parent: Element) {
  const children = Array.from(parent.querySelectorAll(`[${SCALE_ATTRIBUTE}]`))

  const {width, height} = children.reduce((previous, node) => {
    return {
      width: node.clientWidth < previous.width ? node.clientWidth : previous.width,
      height: node.clientHeight < previous.height ? node.clientHeight : previous.height
    }
  }, {width: window.innerWidth, height: window.innerHeight})

  const sentences = children.map((node) => getVisibleText(node))

  const fontSize = ideal(
    sentences,
    height,
    width,
    fontMetrics.height,
    fontMetrics.width,
    PADDING)

  children.forEach((e) => {
    e.setAttribute('style', `font-size: ${fontSize}px; padding: ${PADDING}em`)
  })
}

export function ScaledGrid({children}: ScaledGridProps) {
  const fontMetrics = useRef<Measurable>(null)
  const listNode = useRef<HTMLUListElement>(null)

  const calculate = useCallback(() => {
    if (fontMetrics.current && listNode.current) {
      updateChildSizes(listNode.current)
      updateChildFontSize(fontMetrics.current, listNode.current)
    }
  }, [])

  useLayoutEffect(calculate, [children])
  useResizable(calculate)

  const childrenToShow = Children.toArray(children)
    .filter((child) => !isNil(child))

  return (
    <>
      <FontMetrics ref={fontMetrics}/>
      <ul className={styles.scaledGrid}
          ref={listNode}>
        {
          childrenToShow.map((child, index) => {
            return (
              <li key={index} className={styles.item}>
                {child}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}
