import React, {Component, PropTypes} from 'react'
import Message from './SuccessMessage'
import Image from './SuccessImage'
import _ from 'lodash'

class Success extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: props.messages[Math.floor(Math.random() * props.messages.length)]
    }
  }

  render() {
    const isUrl = _.startsWith(this.state.message, 'http')

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
