import {useEffect, useRef} from 'react'

export function useForceFocus<T extends HTMLElement>() {
  const el = useRef<T>(null)

  useEffect(() => {
    if (el && el.current) {
      el.current.focus()
    }
  }, [])

  return el
}
