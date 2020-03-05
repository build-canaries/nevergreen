import React, {Children, ReactNode, useCallback, useLayoutEffect, useRef, useState} from 'react'
import {isNil} from 'lodash'
import styles from './scaled-grid.scss'
import {useElementResized} from '../common/ResizableHook'

interface ScaledGridProps {
  readonly children: ReactNode;
}

// These need to match those in the CSS
const TABLET_BREAKPOINT = 768 // px
const DESKTOP_BREAKPOINT = 1440 // px

function columns() {
  if (window.innerWidth < TABLET_BREAKPOINT) {
    return 1
  } else if (window.innerWidth < DESKTOP_BREAKPOINT) {
    return 2
  } else {
    return 3
  }
}

function numberOfRows(totalNumberOfItems: number) {
  return Math.ceil(totalNumberOfItems / columns())
}

function numberOfColumns(totalNumberOfItems: number) {
  return Math.min(columns(), totalNumberOfItems)
}

function calculateChildWidth(totalNumberOfItems: number, width: number) {
  const columns = numberOfColumns(totalNumberOfItems)
  const calculated = Math.floor(width / columns)
  return Math.max(calculated, 1)
}

function calculateChildHeight(totalNumberOfItems: number, width: number, height: number) {
  const rows = numberOfRows(totalNumberOfItems)
  const calculated = Math.floor(height / rows)
  return Math.max(calculated, 1)
}

function updateChildSizes(parent: Element) {
  const children = Array.from(parent.childNodes) as Element[]
  const widthPx = calculateChildWidth(children.length, parent.clientWidth)
  const heightPx = calculateChildHeight(children.length, parent.clientWidth, parent.clientHeight)

  return {widthPx, heightPx}
}

export function ScaledGrid({children}: ScaledGridProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const [childHeight, setChildHeight] = useState(1)
  const [childWidth, setChildWidth] = useState(1)

  const calculate = useCallback(() => {
    if (listRef.current) {
      const {heightPx, widthPx} = updateChildSizes(listRef.current)
      setChildHeight(heightPx)
      setChildWidth(widthPx)
    }
  }, [])

  useLayoutEffect(calculate, [children])
  useElementResized(listRef, calculate)

  const childrenToShow = Children.toArray(children)
    .filter((child) => !isNil(child))

  const childStyle = {width: `${childWidth}px`, height: `${childHeight}px`}

  return (
    <>
      <ul className={styles.scaledGrid}
          ref={listRef}>
        {
          childrenToShow.map((child, index) => {
            return (
              <li key={index}
                  className={styles.item}
                  style={childStyle}>
                {child}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}
