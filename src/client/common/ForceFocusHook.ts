import {Ref, useEffect, useRef} from 'react'

export function useForceFocus<T extends HTMLElement>(focus = true, deps: ReadonlyArray<unknown> = []): Ref<T> {
  const el = useRef<T>(null)

  useEffect(() => {
    if (el.current && focus) {
      el.current.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, ...deps])

  return el
}
