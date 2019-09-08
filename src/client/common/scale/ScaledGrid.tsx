import React, {Children, ReactNode, useCallback, useLayoutEffect, useRef, useState} from 'react'
import {ideal, MIN_FONT_SIZE} from './ScaleText'
import {FontMetrics, Measurable} from './FontMetrics'
import _ from 'lodash'
import styles from './scaled-grid.scss'
import {VISUALLY_HIDDEN_ATTRIBUTE} from '../VisuallyHidden'
import {useResizable} from '../ResizableHook'

interface ScaledGridProps {
  readonly children: ReactNode;
}

// These need to match those in the CSS
const TABLET_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1440

// px
const MIN_CHILD_HEIGHT = 32
const CHILD_MARGIN = 5

const DEFAULT_STATE = {childWidth: 0, childHeight: MIN_CHILD_HEIGHT, fontSize: MIN_FONT_SIZE}

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
  return Math.floor((width - (columns * CHILD_MARGIN * 2)) / columns)
}

function calculateChildHeight(totalNumberOfItems: number, width: number, height: number) {
  const rows = numberOfRows(totalNumberOfItems, width)
  const calculated = Math.floor((height - (rows * CHILD_MARGIN * 2)) / rows)
  return Math.max(calculated, MIN_CHILD_HEIGHT)
}

function getVisibleChildren(node: Node): ReadonlyArray<Node> {
  if (node.hasChildNodes()) {
    return _.flatten((Array.from(node.childNodes) as Element[])
      .filter((node) => node.nodeName === '#text' || !node.hasAttribute(VISUALLY_HIDDEN_ATTRIBUTE))
      .map(getVisibleChildren))
  }
  return [node]
}

function getVisibleText(node: Node) {
  return _.join(_.map(getVisibleChildren(node), (n) => n.textContent), '')
}

function calculateChildDimensions(listNode: HTMLUListElement, fontMetrics: Measurable) {
  if (_.isNil(listNode) || _.isNil(fontMetrics) || !listNode.hasChildNodes()) {
    return DEFAULT_STATE
  }

  const childrenText = Array.from(listNode.childNodes).map((node) => getVisibleText(node))
  const totalNumberOfItems = childrenText.length
  const width = listNode.offsetWidth
  const height = listNode.offsetHeight

  const childWidth = calculateChildWidth(totalNumberOfItems, width)
  const childHeight = calculateChildHeight(totalNumberOfItems, width, height)

  const heightScale = fontMetrics.height
  const widthScale = fontMetrics.width

  const fontSize = ideal(childrenText, childHeight, childWidth, heightScale, widthScale)

  return {childWidth, childHeight, fontSize}
}

export function ScaledGrid({children}: ScaledGridProps) {
  const [dimensions, setDimensions] = useState(DEFAULT_STATE)
  const fontMetrics = useRef<Measurable>(null)
  const listNode = useRef<HTMLUListElement>(null)

  const calculate = useCallback(() => {
    if (listNode.current && fontMetrics.current) {
      setDimensions(calculateChildDimensions(listNode.current, fontMetrics.current))
    }
  }, [listNode.current, fontMetrics.current])

  useLayoutEffect(calculate, [children])
  useResizable(calculate)

  const style = {
    width: `${dimensions.childWidth}px`,
    height: `${dimensions.childHeight}px`,
    fontSize: `${dimensions.fontSize}px`,
    margin: `${CHILD_MARGIN}px`
  }

  return (
    <>
      <FontMetrics ref={fontMetrics}/>
      <ul className={styles.scaledGrid} ref={listNode}>
        {
          Children.map(children, (child) => {
            return (
              <li className={styles.item} style={style}>
                {child}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}
