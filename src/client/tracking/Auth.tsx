import React, {ReactElement} from 'react'
import {Input} from '../common/forms/Input'
import styles from './auth.scss'
import {Password} from '../common/forms/Password'
import {AUTH_TYPE_OPTIONS, AuthTypes} from '../domain/Tray'
import {DropDown} from '../common/forms/DropDown'

interface AuthProps {
  readonly authType: AuthTypes;
  readonly setAuthType: (type: AuthTypes) => void;
  readonly username: string;
  readonly setUsername: (username: string) => void;
  readonly password: string;
  readonly setPassword: (password: string) => void;
  readonly accessToken: string;
  readonly setAccessToken: (accessToken: string) => void;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
}

export function Auth(
  {
    authType,
    setAuthType,
    username,
    setUsername,
    password,
    setPassword,
    accessToken,
    setAccessToken,
    disabled,
    readOnly
  }: AuthProps
): ReactElement {
  return (
    <>
      <DropDown options={AUTH_TYPE_OPTIONS}
                value={authType}
                className={styles.authType}
                onChange={({target}) => setAuthType(target.value as AuthTypes)}>
        Authentication
      </DropDown>
      {authType == AuthTypes.basic && (
        <div className={styles.inputs}>
          <Input className={styles.username}
                 value={username}
                 onChange={({target}) => setUsername(target.value)}
                 disabled={disabled}
                 autoComplete='username'
                 readOnly={readOnly}>
            Username
          </Input>
          <Password className={styles.password}
                    value={readOnly ? '*****' : password}
                    onChange={({target}) => setPassword(target.value)}
                    disabled={disabled}
                    autoComplete='new-password'
                    readOnly={readOnly}>
            Password
          </Password>
        </div>
      )}
      {authType == AuthTypes.token && (
        <div className={styles.inputs}>
          <Password className={styles.authToken}
                    value={readOnly ? '*****' : accessToken}
                    onChange={({target}) => setAccessToken(target.value)}
                    disabled={disabled}
                    autoComplete='new-password'
                    readOnly={readOnly}>
            Token
          </Password>
        </div>
      )}
    </>
  )
}
