import React, {Component, PropTypes} from 'react'

class ValidationMessages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let validationMessages = ''

    if (this.props.messages) {
      validationMessages = this.props.messages.map((msg, index) => {
        return (
          <div key={index} className='validation-message'>
            <span className='icon-notification'/>
            <span className='text-with-icon'>{msg}</span>
          </div>
        )
      })
    }

    return <div className='validation-messages'>{validationMessages}</div>
  }
}

ValidationMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string)
}

export default ValidationMessages
