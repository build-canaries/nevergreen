import {useEffect, useRef} from 'react'

export function useForceFocus() {
  const el = useRef(null)

  useEffect(() => {
    if (el && el.current) {
      el.current.focus()
    }
  }, [])

  return el
}
