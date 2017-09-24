import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './checkbox.scss'

class Checkbox extends Component {
  onChange = (evt) => {
    this.props.onToggle(evt.target.checked)
  }

  render() {
    const classes = classNames(styles.label, this.props.className)
    const inputProps = _.omit(this.props, ['children', 'onToggle', 'className'])

    return (
      <label className={classes}>
        <input className={styles.input} type='checkbox' onChange={this.onChange} {...inputProps}/>
        <span className={styles.children}>{this.props.children}</span>
      </label>
    )
  }
}

Checkbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default Checkbox
