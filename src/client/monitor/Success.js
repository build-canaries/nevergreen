import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Message from './SuccessMessage'
import Image from './SuccessImage'
import startsWith from 'lodash/startsWith'

class Success extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: props.messages[Math.floor(Math.random() * props.messages.length)]
    }
  }

  render() {
    const isUrl = startsWith(this.state.message, 'http')

    if (isUrl) {
      return <Image url={this.state.message}/>
    } else {
      return <Message message={this.state.message}/>
    }
  }
}

Success.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Success
