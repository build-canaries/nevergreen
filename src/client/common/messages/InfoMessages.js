import React, {Component, PropTypes} from 'react'
import './messages.scss'

class InfoMessages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let infoMessages = ''

    if (this.props.messages) {
      infoMessages = this.props.messages.map((msg, index) => {
        return (
          <div key={index} className='info-message'>
            <span className='icon-checkmark'/>
            <span className='text-with-icon'>{msg}</span>
          </div>
        )
      })
    }

    return <div className='info-messages'>{infoMessages}</div>
  }
}

InfoMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string)
}

export default InfoMessages
