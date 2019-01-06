import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {SuccessMessage} from '../common/SuccessMessage'
import {SuccessImage} from './SuccessImage'
import {isBlank, randomFrom} from '../common/Utils'
import {hasScheme} from '../domain/Url'

export class Success extends Component {

  constructor(props) {
    super(props)
    const message = randomFrom(props.messages)
    const isUrl = hasScheme(message)
    this.state = {message, isUrl}
  }

  render() {
    const {isUrl, message} = this.state

    if (isBlank(message)) {
      return null
    }

    if (isUrl) {
      return <SuccessImage url={message}/>
    } else {
      return <SuccessMessage message={message}/>
    }
  }
}

Success.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired
}
