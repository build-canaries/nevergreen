import React, {useState} from 'react'
import {SuccessMessage} from '../common/SuccessMessage'
import {SuccessImage} from './SuccessImage'
import {isBlank, randomFrom} from '../common/Utils'
import {hasScheme} from '../domain/Url'

export interface SuccessProps {
  messages: string[];
}

export function Success({messages}: SuccessProps) {
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
