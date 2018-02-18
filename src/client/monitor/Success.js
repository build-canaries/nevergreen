import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Message from './SuccessMessage'
import Image from './SuccessImage'
import _ from 'lodash'
import {randomFrom} from '../common/Utils'

class Success extends Component {
  constructor(props) {
    super(props)
    this.state = {message: randomFrom(props.messages)}
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
