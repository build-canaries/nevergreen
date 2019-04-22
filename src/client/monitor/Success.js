import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {SuccessMessage} from '../common/SuccessMessage'
import {SuccessImage} from './SuccessImage'
import {isBlank, randomFrom} from '../common/Utils'
import {hasScheme} from '../domain/Url'

export function Success({messages}) {
  const [message] = useState(randomFrom(messages))

  if (isBlank(message)) {
    return null
  }

  if (hasScheme(message)) {
    return <SuccessImage url={message}/>
  } else {
    return <SuccessMessage message={message}/>
  }
}

Success.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired
}
