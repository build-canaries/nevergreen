import React, {useLayoutEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Mousetrap from 'mousetrap'

function click(parent) {
  if (parent) {
    parent.focus()
    parent.click()
  }
  return false
}

export function Shortcut({hotkeys}) {
  const parentNode = useRef()

  useLayoutEffect(() => {
    Mousetrap.bind(hotkeys, () => click(parentNode.current))
    return () => {
      Mousetrap.unbind(hotkeys)
    }
  }, [hotkeys])

  return <span ref={parentNode} aria-hidden/>
}

Shortcut.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired
}
