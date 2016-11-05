import React, {Component, PropTypes} from 'react'
import AddedMessages from './AddedMessages'
import AddedImages from './AddedImages'
import AddMessage from './AddMessage'
import './success.scss'

class Success extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const messages = this.props.messages.filter((m) => !m.startsWith('http'))
    const images = this.props.messages.filter((m) => m.startsWith('http'))

    return (
      <section className='success'>
        <h2 className='visually-hidden'>Success</h2>
        <AddMessage addMessage={this.props.addMessage}/>
        <AddedMessages messages={messages} removeMessage={this.props.removeMessage}/>
        <AddedImages urls={images} removeMessage={this.props.removeMessage}/>
      </section>
    )
  }
}

Success.propTypes = {
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default Success
