import React, {ReactElement, useState} from 'react'
import {SuccessMessage} from '../common/SuccessMessage'
import {SuccessImage} from './SuccessImage'
import {isBlank, randomFrom} from '../common/Utils'
import {isValidHttpUrl} from '../domain/Url'
import {useSelector} from 'react-redux'
import {getSuccessMessages} from '../settings/success/SuccessReducer'

export function Success(): ReactElement | null {
  const messages = useSelector(getSuccessMessages)
  const [message] = useState(randomFrom(messages))

  if (isBlank(message)) {
    return null
  }

  if (isValidHttpUrl(message)) {
    return <SuccessImage url={message}/>
  } else {
    return <SuccessMessage message={message}/>
  }
}
