import React, {ReactElement} from 'react'
import {Input} from '../common/forms/Input'
import styles from './auth.scss'
import {Password} from '../common/forms/Password'
import {authTypeDisplay, AuthTypes} from '../domain/Tray'
import {Radio} from '../common/forms/Radio'
import uniqueId from 'lodash/uniqueId'

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
  const groupName = uniqueId('auth')

  return (
    <>
      <fieldset disabled={disabled || readOnly}>
        <legend className={styles.legend}>authentication</legend>
        <Radio name={groupName}
               value={AuthTypes.none}
               checked={authType === AuthTypes.none}
               onChange={() => setAuthType(AuthTypes.none)}
               className={styles.authType}
               readOnly={readOnly}>
          {authTypeDisplay(AuthTypes.none)}
        </Radio>
        <Radio name={groupName}
               value={AuthTypes.basic}
               checked={authType === AuthTypes.basic}
               onChange={() => setAuthType(AuthTypes.basic)}
               className={styles.authType}
               readOnly={readOnly}>
          {authTypeDisplay(AuthTypes.basic)}
        </Radio>
        <Radio name={groupName}
               value={AuthTypes.token}
               checked={authType === AuthTypes.token}
               onChange={() => setAuthType(AuthTypes.token)}
               className={styles.authType}
               readOnly={readOnly}>
          {authTypeDisplay(AuthTypes.token)}
        </Radio>
      </fieldset>
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
