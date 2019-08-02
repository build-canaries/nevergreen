import React from 'react'
import {Input} from '../common/forms/Input'
import styles from './auth.scss'
import {Password} from '../common/forms/Password'
import {AuthTypes} from '../domain/Tray'
import {Radio} from '../common/forms/Radio'
import {uniqueId} from 'lodash'

interface AuthProps {
  authType: AuthTypes;
  setAuthType: (type: AuthTypes) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  onEnter: () => void;
}

export function Auth({authType, setAuthType, username, setUsername, password, setPassword, accessToken, setAccessToken, onEnter}: AuthProps) {
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
               data-locator='auth-none'>
          no auth
        </Radio>
        <Radio name={groupName}
               value={AuthTypes.basic}
               checked={authType === AuthTypes.basic}
               onChange={() => setAuthType(AuthTypes.basic)}
               className={styles.authType}
               data-locator='auth-basic'>
          basic auth
        </Radio>
        <Radio name={groupName}
               value={AuthTypes.token}
               checked={authType === AuthTypes.token}
               onChange={() => setAuthType(AuthTypes.token)}
               className={styles.authType}
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
                 data-locator='auth-username'
                 autoComplete='username'>
            <span className={styles.label}>username</span>
          </Input>
          <Password className={styles.password}
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    onEnter={onEnter}
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
                    data-locator='auth-access-token'
                    autoComplete='token'>
            <span className={styles.label}>token</span>
          </Password>
        </div>
      )}
    </>
  )
}
