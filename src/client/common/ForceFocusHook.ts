import {Ref, useEffect, useRef} from 'react'

export function useForceFocus<T extends HTMLElement>(): Ref<T> {
  const el = useRef<T>(null)

  useEffect(() => {
    if (el.current) {
      el.current.focus()
    }
  }, [])

  return el
}
