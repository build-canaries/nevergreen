import React, {ReactElement, useState} from 'react'
import {uniqueId} from 'lodash'
import {InputButton} from './Button'
import {iEye, iEyeBlocked} from '../fonts/Icons'
import {Input, InputProps} from './Input'

export function Password(props: Omit<InputProps, 'type'>): ReactElement {
  const [type, setType] = useState('password')

  const actualId = props.id ?? uniqueId('i')

  const showPassword = (
    <InputButton aria-controls={actualId}
                 icon={iEye}
                 onClick={() => setType('text')}>
      show password
    </InputButton>
  )

  const hidePassword = (
    <InputButton aria-controls={actualId}
                 icon={iEyeBlocked}
                 onClick={() => setType('password')}>
      hide password
    </InputButton>
  )

  return (
    <Input id={actualId}
           type={type}
           button={type === 'password' ? showPassword : hidePassword}
           autoComplete='new-password'
           {...props}/>
  )
}
