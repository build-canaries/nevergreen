import React, {ReactElement} from 'react'
import {Input} from '../common/forms/Input'
import styles from './auth.scss'
import {Password} from '../common/forms/Password'
import {AuthTypes} from '../domain/Tray'
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
    disabled
  }: AuthProps
): ReactElement {
  const groupName = uniqueId('auth')

  return (
    <>
      <fieldset>
        <legend className={styles.legend}>authentication</legend>
        <Radio name={groupName}
               value={AuthTypes.none}
               checked={authType === AuthTypes.none}
               onChange={() => setAuthType(AuthTypes.none)}
               className={styles.authType}
               disabled={disabled}
               data-locator='auth-none'>
          No auth
        </Radio>
        <Radio name={groupName}
               value={AuthTypes.basic}
               checked={authType === AuthTypes.basic}
               onChange={() => setAuthType(AuthTypes.basic)}
               className={styles.authType}
               disabled={disabled}
               data-locator='auth-basic'>
          Basic auth
        </Radio>
        <Radio name={groupName}
               value={AuthTypes.token}
               checked={authType === AuthTypes.token}
               onChange={() => setAuthType(AuthTypes.token)}
               className={styles.authType}
               disabled={disabled}
               data-locator='auth-token'>
          Access token
        </Radio>
      </fieldset>
      {authType == AuthTypes.basic && (
        <div className={styles.inputs}>
          <Input className={styles.username}
                 value={username}
                 onChange={({target}) => setUsername(target.value)}
                 disabled={disabled}
                 autoComplete='username'
                 data-locator='auth-username'>
            Username
          </Input>
          <Password className={styles.password}
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    disabled={disabled}
                    autoComplete='new-password'
                    data-locator='auth-password'>
            Password
          </Password>
        </div>
      )}
      {authType == AuthTypes.token && (
        <div className={styles.inputs}>
          <Password className={styles.authToken}
                    value={accessToken}
                    onChange={({target}) => setAccessToken(target.value)}
                    disabled={disabled}
                    autoComplete='new-password'
                    data-locator='auth-access-token'>
            Token
          </Password>
        </div>
      )}
    </>
  )
}
