import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import './messages.scss'

class Messages extends Component {
  render() {
    if (_.isEmpty(this.props.messages)) {
      return null
    }

    const messageClasses = classNames('message', this.props.type)

    return (
      <ul className='messages'>
        {
          this.props.messages.map((msg) => {
            return <li key={msg} className={messageClasses}>{msg}</li>
          })
        }
      </ul>
    )
  }
}

Messages.propTypes = {
  type: PropTypes.oneOf(['info', 'error']).isRequired,
  messages: PropTypes.arrayOf(PropTypes.string)
}

export default Messages
