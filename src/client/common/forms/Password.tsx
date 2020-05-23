import React, {ReactElement, useState} from 'react'
import {uniqueId} from 'lodash'
import {InputButton} from './Button'
import {iEye, iEyeBlocked} from '../fonts/Icons'
import {Input, InputProps} from './Input'

export function Password(props: InputProps): ReactElement {
  const [type, setType] = useState('password')

  const id = uniqueId('p')

  const showPassword = (
    <InputButton aria-controls={id}
                 icon={iEye}
                 onClick={() => setType('text')}>
      show password
    </InputButton>
  )

  const hidePassword = (
    <InputButton aria-controls={id}
                 icon={iEyeBlocked}
                 onClick={() => setType('password')}>
      hide password
    </InputButton>
  )

  return (
    <Input id={id}
           type={type}
           button={type === 'password' ? showPassword : hidePassword}
           autoComplete='new-password'
           {...props}/>
  )
}
