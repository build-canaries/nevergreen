import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {SuccessMessage} from './SuccessMessage'
import {SuccessImage} from './SuccessImage'
import _ from 'lodash'
import {randomFrom} from '../common/Utils'

export class Success extends Component {

  constructor(props) {
    super(props)
    const message = randomFrom(props.messages)
    const isUrl = _.startsWith(message, 'http')
    this.state = {message, isUrl}
  }

  render() {
    const {isUrl, message} = this.state

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
