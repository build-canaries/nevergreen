import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './checkbox.scss'

export function Checkbox({children, onToggle, className, ...inputProps}) {
  const classes = classNames(styles.container, className)
  const id = _.uniqueId()

  return (
    <div className={classes}>
      <div className={styles.checkbox}>
        <input id={id}
               className={styles.input}
               type='checkbox'
               onChange={(evt) => onToggle(evt.target.checked)}
               {...inputProps}/>
        <label htmlFor={id} className={styles.children}>{children}</label>
      </div>
    </div>
  )
}

Checkbox.propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string
}
