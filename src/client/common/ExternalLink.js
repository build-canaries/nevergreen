import React from 'react'
import PropTypes from 'prop-types'
import {VisuallyHidden} from './VisuallyHidden'

export function ExternalLink({children, ...aProps}) {
  return (
    <a {...aProps} target='_blank' rel='noopener noreferrer'>
      {children}
      <VisuallyHidden> (opens in a new window)</VisuallyHidden>
    </a>
  )
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired
}
