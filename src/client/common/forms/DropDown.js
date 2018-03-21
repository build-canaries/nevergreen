import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './drop-down.scss'

class DropDown extends Component {
  render() {
    const inputProps = _.omit(this.props, ['children', 'title', 'className'])
    const labelClasses = classNames(styles.dropDown, this.props.className)

    return (
      <label className={labelClasses}>
        <div className={styles.label}>{this.props.title}</div>
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
