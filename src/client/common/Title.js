import React, {useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import {VisuallyHidden} from '../common/VisuallyHidden'
import {useForceFocus} from './ForceFocusHook'

export function Title({children}) {
  const titleEl = useForceFocus()

  useLayoutEffect(() => {
    document.title = children
    return () => {
      document.title = 'Nevergreen'
    }
  }, [children])

  return (
    <VisuallyHidden>
      <h1 ref={titleEl}
          tabIndex='-1'
          data-locator='title'>
        {children}
      </h1>
    </VisuallyHidden>
  )
}

Title.propTypes = {
  children: PropTypes.string.isRequired
}
