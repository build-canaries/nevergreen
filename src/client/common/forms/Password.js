import React, {useState} from 'react'
import _ from 'lodash'
import {InputButton} from './Button'
import {iEye, iEyeBlocked} from '../fonts/Icons'
import {Input} from './Input'

export function Password(props) {
  const [type, setType] = useState('password')

  const id = _.uniqueId('i')

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
