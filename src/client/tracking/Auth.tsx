import React from 'react'
import {Input} from '../common/forms/Input'
import styles from './auth.scss'
import {Password} from '../common/forms/Password'
import {AuthTypes} from '../domain/Tray'
import {Radio} from '../common/forms/Radio'
import {uniqueId} from 'lodash'

interface AuthProps {
  readonly authType: AuthTypes;
  readonly setAuthType: (type: AuthTypes) => void;
  readonly username: string;
  readonly setUsername: (username: string) => void;
  readonly password: string;
  readonly setPassword: (password: string) => void;
  readonly accessToken: string;
  readonly setAccessToken: (accessToken: string) => void;
  readonly onEnter: () => void;
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
    onEnter,
    disabled
  }: AuthProps
) {
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
          no auth
        </Radio>
        <Radio name={groupName}
               value={AuthTypes.basic}
               checked={authType === AuthTypes.basic}
               onChange={() => setAuthType(AuthTypes.basic)}
               className={styles.authType}
               disabled={disabled}
               data-locator='auth-basic'>
          basic auth
        </Radio>
        <Radio name={groupName}
               value={AuthTypes.token}
               checked={authType === AuthTypes.token}
               onChange={() => setAuthType(AuthTypes.token)}
               className={styles.authType}
               disabled={disabled}
               data-locator='auth-token'>
          access token
        </Radio>
      </fieldset>
      {authType == AuthTypes.basic && (
        <div className={styles.inputs}>
          <Input className={styles.username}
                 value={username}
                 onChange={({target}) => setUsername(target.value)}
                 onEnter={onEnter}
                 disabled={disabled}
                 autoComplete='username'
                 data-locator='auth-username'>
            <span className={styles.label}>username</span>
          </Input>
          <Password className={styles.password}
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    onEnter={onEnter}
                    disabled={disabled}
                    autoComplete='new-password'
                    data-locator='auth-password'>
            <span className={styles.label}>password</span>
          </Password>
        </div>
      )}
      {authType == AuthTypes.token && (
        <div className={styles.inputs}>
          <Password className={styles.authToken}
                    value={accessToken}
                    onChange={({target}) => setAccessToken(target.value)}
                    onEnter={onEnter}
                    disabled={disabled}
                    autoComplete='new-password'
                    data-locator='auth-access-token'>
            <span className={styles.label}>token</span>
          </Password>
        </div>
      )}
    </>
  )
}
