import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './drop-down.scss'
import formStyles from './forms.scss'

export function DropDown({className, children, options, disabled, ...inputProps}) {
  const labelClasses = classNames(formStyles.inputContainer, className)
  const id = _.uniqueId('i')

  return (
    <label className={labelClasses} htmlFor={id}>
      <span className={formStyles.inputLabel}>{children}</span>
      <select className={styles.input} {...inputProps} id={id}>
        {
          options.map((op) => {
            return <option key={op.value} value={op.value}>{op.display}</option>
          })
        }
      </select>
      <span className={classNames(styles.arrow, {[styles.disabled]: disabled})} aria-hidden/>
    </label>
  )
}

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
  })).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool
}
