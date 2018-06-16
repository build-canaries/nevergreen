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
    const classes = classNames(styles.container, this.props.className)
    const inputProps = _.omit(this.props, ['children', 'onToggle', 'className'])
    const id = _.uniqueId()

    return (
      <div className={classes}>
        <div className={styles.checkbox}>
          <input id={id}
                 className={styles.input}
                 type='checkbox'
                 onChange={this.onChange}
                 {...inputProps}/>
          <label htmlFor={id} className={styles.children}>{this.props.children}</label>
        </div>
      </div>
    )
  }
}

Checkbox.propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default Checkbox
