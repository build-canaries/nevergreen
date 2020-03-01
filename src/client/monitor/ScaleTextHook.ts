import {RefObject, useCallback, useContext, useMemo, useState} from 'react'
import {ideal} from './ScaleText'
import {FontMetricsContext} from '../FontMetrics'
import {useElementResized} from '../common/ResizableHook'

interface IdealFontStyle {
  readonly fontSize: string;
  readonly padding: string;
}

export function useIdealFontSize(elementRef: RefObject<Element>, sentences: ReadonlyArray<string>, paddingEm = 0.5): IdealFontStyle {
  const {width, height} = useContext(FontMetricsContext)
  const [elementSize, setElementSize] = useState({width: 0, height: 0})

  const onResize = useCallback((currentSize) => {
    setElementSize((previousSize) => {
      const heightChanged = Math.abs(currentSize.height - previousSize.height) > 1
      const widthChanged = Math.abs(currentSize.width - previousSize.width) > 1
      return heightChanged || widthChanged
        ? {width: currentSize.width, height: currentSize.height}
        : previousSize
    })
  }, [])

  useElementResized(elementRef, onResize)

  return useMemo(() => {
    const fontSize = ideal(
      sentences,
      elementSize.height,
      elementSize.width,
      height,
      width,
      paddingEm)

    return {fontSize: `${fontSize}px`, padding: `${paddingEm}em`}
  }, [sentences, elementSize.height, elementSize.width, height, width, paddingEm])
}
