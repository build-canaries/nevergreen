import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Shortcut from '../common/Shortcut'
import classNames from 'classnames'
import styles from './remove-link.scss'

class RemoveLink extends Component {
  render() {
    const classes = classNames(styles.removeLink, this.props.className)

    return (
      <button className={classes}
              onClick={this.props.removeMessage}
              title={`remove ${this.props.message}`}>
        <div>remove {this.props.message}</div>
        <Shortcut hotkeys={this.props.hotkeys}/>
      </button>
    )
  }
}

RemoveLink.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default RemoveLink
