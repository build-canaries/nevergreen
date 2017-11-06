import React, {Component} from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import classNames from 'classnames'
import styles from './drop-down.scss'

class DropDown extends Component {
  render() {
    const inputProps = omit(this.props, ['children', 'title', 'className'])
    const labelClasses = classNames(styles.dropDown, this.props.className)

    return (
      <label className={labelClasses}>
        <span className={styles.label}>{this.props.title}</span>
        <select className={styles.input} {...inputProps}>
          {this.props.children}
        </select>
      </label>
    )
  }
}

DropDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  title: PropTypes.string,
  className: PropTypes.string
}

export default DropDown
