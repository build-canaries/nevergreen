import React, {useLayoutEffect, useRef} from 'react'
import Mousetrap from 'mousetrap'

interface ShortcutProps {
  hotkeys: string[];
}

function click(parent: HTMLSpanElement | null): boolean {
  if (parent) {
    parent.focus()
    parent.click()
  }
  return false
}

export function Shortcut({hotkeys}: ShortcutProps) {
  const parentNode = useRef(null)

  useLayoutEffect(() => {
    Mousetrap.bind(hotkeys, () => click(parentNode.current))
    return () => {
      Mousetrap.unbind(hotkeys)
    }
  }, [hotkeys])

  return <span ref={parentNode} aria-hidden/>
}
