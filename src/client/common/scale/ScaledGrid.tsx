import React, {Children, ReactNode, useCallback, useLayoutEffect, useRef} from 'react'
import {ideal} from './ScaleText'
import {FontMetrics, Measurable} from './FontMetrics'
import _ from 'lodash'
import styles from './scaled-grid.scss'
import {VISUALLY_HIDDEN_ATTRIBUTE} from '../VisuallyHidden'
import {useResizable} from '../ResizableHook'
import cn from 'classnames'

interface ScaledGridProps {
  readonly children: ReactNode;
}

export const SCALE_ATTRIBUTE = 'data-scale'

function getVisibleChildren(node: Node): ReadonlyArray<Node> {
  if (node.hasChildNodes()) {
    return _.flatten((Array.from(node.childNodes) as Element[])
      .filter((node) => node.nodeName === '#text' || !node.hasAttribute(VISUALLY_HIDDEN_ATTRIBUTE))
      .map(getVisibleChildren))
  }
  return [node]
}

function getVisibleText(node: Node) {
  return _.join(_.map(getVisibleChildren(node), (n) => _.trim(n.textContent as string)), '')
}

export function ScaledGrid({children}: ScaledGridProps) {
  const fontMetrics = useRef<Measurable>(null)
  const listNode = useRef<HTMLUListElement>(null)

  const calculate = useCallback(() => {
    if (fontMetrics.current && listNode.current) {
      const scaledNodes = Array.from(listNode.current.querySelectorAll(`[${SCALE_ATTRIBUTE}]`))

      const {width, height} = scaledNodes.reduce((previous, node) => {
        return {
          width: node.clientWidth < previous.width ? node.clientWidth : previous.width,
          height: node.clientHeight < previous.height ? node.clientHeight : previous.height
        }
      }, {width: window.innerWidth, height: window.innerHeight})

      const sentences = scaledNodes.map((node) => getVisibleText(node))

      const fontSize = ideal(
        sentences,
        height,
        width,
        fontMetrics.current.height,
        fontMetrics.current.width)

      scaledNodes.forEach((e) => {
        e.setAttribute('style', `font-size: ${fontSize}px;`)
      })
    }
  }, [])

  useLayoutEffect(calculate, [children])
  useResizable(calculate)

  const childrenToShow = Children.toArray(children)
    .filter((child) => !_.isNil(child))

  const listClasses = cn(styles.scaledGrid, {
    [styles.oneChild]: childrenToShow.length === 1,
    [styles.twoChildren]: childrenToShow.length === 2
  })

  return (
    <>
      <FontMetrics ref={fontMetrics}/>
      <ul className={listClasses}
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
