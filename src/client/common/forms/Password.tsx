import React, { ReactElement, useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import { InputButton } from './Button'
import { Input, InputProps } from './Input'
import { Eye } from '../icons/Eye'
import { EyeBlocked } from '../icons/EyeBlocked'

export function Password(props: Omit<InputProps, 'type'>): ReactElement {
  const [type, setType] = useState('password')

  const actualId = props.id ?? uniqueId('i')

  const showPassword = (
    <InputButton
      aria-controls={actualId}
      icon={<Eye />}
      onClick={() => setType('text')}
    >
      show password
    </InputButton>
  )

  const hidePassword = (
    <InputButton
      aria-controls={actualId}
      icon={<EyeBlocked />}
      onClick={() => setType('password')}
    >
      hide password
    </InputButton>
  )

  return (
    <Input
      id={actualId}
      type={type}
      button={type === 'password' ? showPassword : hidePassword}
      autoComplete="new-password"
      {...props}
    />
  )
}
