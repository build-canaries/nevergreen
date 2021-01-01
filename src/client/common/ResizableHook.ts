import {RefObject, useEffect} from 'react'
import isNil from 'lodash/isNil'
import {debug} from './Logger'
import {ResizeObserver} from '@juggle/resize-observer'
import {ResizeObserverEntry} from '@juggle/resize-observer/lib/ResizeObserverEntry'

if ('ResizeObserver' in window) {
  debug('Using native ResizeObserver')
} else {
  debug('Using ResizeObserver polyfill')
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Suppressing TS2339 on window.ResizeObserver as it isn't standard, hence the polyfill
const Observer = <typeof ResizeObserver>(window.ResizeObserver || ResizeObserver)

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

export const useElementResized = (elementRef: RefObject<Element>, onResize: (size: DOMRectReadOnly) => void): void => {
  useEffect(() => {
    const el = elementRef.current

    if (isNil(el)) {
      return
    }

    let requestId = 0

    const observer = new Observer((entries: ReadonlyArray<ResizeObserverEntry>) => {
      cancel(requestId)
      requestId = requestAnimationFrame(() => {
        entries.forEach((entry) => {
          onResize(entry.contentRect)
        })
      })
    })
    observer.observe(el)

    return () => {
      cancel(requestId)
      observer.disconnect()
    }
  }, [elementRef, onResize])
}
