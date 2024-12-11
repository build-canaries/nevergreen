import type { ReactElement } from 'react'
import { useId, useState } from 'react'
import type { InputProps } from './Input'
import { Input } from './Input'
import { InputButton } from './Button'
import { Eye } from '../icons/Eye'
import { EyeBlocked } from '../icons/EyeBlocked'

export function Password({
  id,
  children,
  ...props
}: Omit<InputProps, 'type'>): ReactElement {
  const [type, setType] = useState('password')
  const idIfNotProvided = useId()

  const actualId = id ?? idIfNotProvided

  const showPassword = (
    <InputButton
      aria-controls={actualId}
      icon={<Eye />}
      onClick={() => {
        setType('text')
      }}
    >
      show password
    </InputButton>
  )

  const hidePassword = (
    <InputButton
      aria-controls={actualId}
      icon={<EyeBlocked />}
      onClick={() => {
        setType('password')
      }}
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
    >
      {children}
    </Input>
  )
}
