import React, {Component, PropTypes} from 'react'
import './messages.scss'

class Messages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.messages) {
      const renderedMessages = this.props.messages.map((msg, index) => {
        return (
          <li key={index} className='message'>
            <span className={`icon-${this.props.type}`}/>
            <span className='text-with-icon'>{msg}</span>
          </li>
        )
      })
      return <ul className={`messages ${this.props.type}`}>{renderedMessages}</ul>
    }
    return null
  }
}

Messages.propTypes = {
  type: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string)
}

export default Messages
