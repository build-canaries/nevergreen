import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './drop-down.scss'
import formStyles from './forms.scss'

export function DropDown({className, children, options, disabled, ...inputProps}) {
  const labelClasses = classNames(formStyles.inputContainer, className)

  return (
    <label className={labelClasses}>
      <div className={formStyles.inputLabel}>{children}</div>
      <select className={styles.input} {...inputProps}>
        {
          options.map((op) => {
            return <option key={op.value} value={op.value}>{op.display}</option>
          })
        }
      </select>
      <div className={classNames(styles.arrow, {[styles.disabled]: disabled})}/>
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
