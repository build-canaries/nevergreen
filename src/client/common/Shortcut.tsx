import React, {ReactElement, useEffect, useRef} from 'react'
import Mousetrap from 'mousetrap'

interface ShortcutProps {
  readonly hotkeys: string[];
}

function click(parent: HTMLSpanElement | null): boolean {
  if (parent) {
    parent.focus()
    parent.click()
  }
  return false
}

export function Shortcut({hotkeys}: ShortcutProps): ReactElement {
  const parentNode = useRef(null)

  useEffect(() => {
    Mousetrap.bind(hotkeys, () => click(parentNode.current))
    return () => {
      Mousetrap.unbind(hotkeys)
    }
  }, [hotkeys])

  return <span ref={parentNode} aria-hidden/>
}
