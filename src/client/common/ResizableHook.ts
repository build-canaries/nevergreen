import {RefObject, useEffect} from 'react'
import {isNil} from 'lodash'
import {debug} from './Logger'
import {ResizeObserver as Polyfill} from '@juggle/resize-observer'
import {ResizeObserverEntry} from '@juggle/resize-observer/lib/ResizeObserverEntry'

interface ElementSize {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly left: number;
  readonly bottom: number;
  readonly right: number;
}

if ('ResizeObserver' in window) {
  debug('Using native ResizeObserver')
} else {
  debug('Using ResizeObserver polyfill')
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const ResizeObserver = window.ResizeObserver || Polyfill

function cancel(requestId: number) {
  if (requestId !== 0) {
    cancelAnimationFrame(requestId)
  }
}

export const useWindowResized = (onResize: () => void) => {
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

export const useElementResized = (elementRef: RefObject<Element>, onResize: (size: ElementSize) => void) => {
  useEffect(() => {
    const el = elementRef.current

    if (isNil(el)) {
      return
    }

    let requestId = 0

    const observer = new ResizeObserver((entries: ReadonlyArray<ResizeObserverEntry>) => {
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
