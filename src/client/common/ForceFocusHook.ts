import {Ref, useLayoutEffect, useRef} from 'react'

export function useForceFocus<T extends HTMLElement>(): Ref<T> {
  const el = useRef<T>(null)

  useLayoutEffect(() => {
    if (el.current) {
      el.current.focus()
    }
  }, [el.current])

  return el
}
