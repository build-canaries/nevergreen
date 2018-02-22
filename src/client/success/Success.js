import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import AddedMessages from './AddedMessages'
import AddedImages from './AddedImages'
import AddMessage from './AddMessage'
import Title from '../common/Title'

class Success extends Component {
  render() {
    const messages = this.props.messages.filter((m) => !m.startsWith('http'))
    const images = this.props.messages.filter((m) => m.startsWith('http'))

    return (
      <Fragment>
        <Title>Success</Title>
        <AddMessage addMessage={this.props.addMessage}/>
        <AddedMessages messages={messages} removeMessage={this.props.removeMessage}/>
        <AddedImages urls={images} removeMessage={this.props.removeMessage}/>
      </Fragment>
    )
  }
}

Success.propTypes = {
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default Success
