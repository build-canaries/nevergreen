import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './drop-down.scss'
import formStyles from './forms.scss'

class DropDown extends Component {
  render() {
    const inputProps = _.omit(this.props, ['children', 'title', 'className'])
    const labelClasses = classNames(formStyles.inputContainer, this.props.className)

    return (
      <label className={labelClasses}>
        <div className={formStyles.inputLabel}>{this.props.title}</div>
        <select className={styles.input} {...inputProps}>
          {this.props.children}
        </select>
      </label>
    )
  }
}

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default DropDown
