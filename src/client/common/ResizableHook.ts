import { RefObject, useEffect } from 'react'
import isNil from 'lodash/isNil'

function cancel(requestId: number) {
  if (requestId !== 0) {
    cancelAnimationFrame(requestId)
  }
}

export const useWindowResized = (onResize: () => void): void => {
  useEffect(() => {
    let requestId = 0
    const onResizeThrottled = () => {
      cancel(requestId)
      requestId = requestAnimationFrame(onResize)
    }
    window.addEventListener('resize', onResizeThrottled)
    return () => {
      cancel(requestId)
      window.removeEventListener('resize', onResizeThrottled)
    }
  }, [onResize])
}

export const useElementResized = (
  elementRef: RefObject<Element>,
  onResize: (size: DOMRectReadOnly) => void,
): void => {
  useEffect(() => {
    const el = elementRef.current

    if (isNil(el)) {
      return
    }

    let requestId = 0

    const observer = new ResizeObserver(
      (entries: ReadonlyArray<ResizeObserverEntry>) => {
        cancel(requestId)
        requestId = requestAnimationFrame(() => {
          entries.forEach((entry) => {
            onResize(entry.contentRect)
          })
        })
      },
    )
    observer.observe(el)

    return () => {
      cancel(requestId)
      observer.disconnect()
    }
  }, [elementRef, onResize])
}
