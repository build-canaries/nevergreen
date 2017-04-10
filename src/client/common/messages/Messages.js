import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import './messages.scss'

class Messages extends Component {
  render() {
    if (_.isEmpty(this.props.messages)) {
      return null
    }

    const classes = classNames('messages', this.props.className, this.props.type)

    return (
      <ul className={classes}>
        {
          this.props.messages.map((msg) => {
            return <li key={msg} className='message'>{msg}</li>
          })
        }
      </ul>
    )
  }
}

Messages.propTypes = {
  type: PropTypes.oneOf(['info', 'error']).isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
}

export default Messages
