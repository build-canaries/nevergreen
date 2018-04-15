import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './drop-down.scss'
import formStyles from './forms.scss'

class DropDown extends Component {
  render() {
    const inputProps = _.omit(this.props, ['children', 'options', 'className'])
    const labelClasses = classNames(formStyles.inputContainer, this.props.className)

    return (
      <label className={labelClasses}>
        <div className={formStyles.inputLabel}>{this.props.children}</div>
        <select className={styles.input} {...inputProps}>
          {
            this.props.options.map((op) => {
              return <option key={op.value} value={op.value}>{op.display}</option>
            })
          }
        </select>
        <div className={classNames(styles.arrow, {[styles.disabled]: this.props.disabled})}/>
      </label>
    )
  }
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

export default DropDown
