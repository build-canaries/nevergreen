import React from 'react'
import PropTypes from 'prop-types'
import styles from './visually-hidden.scss'

export const VISUALLY_HIDDEN_ATTRIBUTE = 'data-visually-hidden'

export function VisuallyHidden({children}) {
  const hiddenAttribute = {[VISUALLY_HIDDEN_ATTRIBUTE]: true}
  return <span className={styles.content} {...hiddenAttribute}>{children}</span>
}

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired
}
