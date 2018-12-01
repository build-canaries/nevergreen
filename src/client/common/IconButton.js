import React from 'react'
import PropTypes from 'prop-types'
import {VisuallyHidden} from './VisuallyHidden'
import cn from 'classnames'
import styles from './icon-button.scss'
import iconStyles from './fonts/icon-font.scss'

export function IconButton({icon, label, className, ...buttonProps}) {
  return (
    <button className={cn(iconStyles[`icon-${icon}`], styles.button, className)}
            {...buttonProps}>
      <VisuallyHidden>{label}</VisuallyHidden>
    </button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string
}
