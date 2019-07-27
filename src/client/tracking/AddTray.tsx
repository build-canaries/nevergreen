import React, {useState} from 'react'
import {Input} from '../common/forms/Input'
import {WithHelp} from '../common/ContextualHelp'
import {TrackingHelp} from './TrackingHelp'
import styles from './add-tray.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iPlus} from '../common/fonts/Icons'
import {Password} from '../common/forms/Password'

interface AddTrayProps {
  addTray: (url: string, username?: string, password?: string) => void;
  addTrayUsingToken: (url: string, authToken?: string) => void;
}

export function AddTray({addTray, addTrayUsingToken}: AddTrayProps) {
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [authType, setAuthType] = useState('username_password')

  const addTrayAndClearInput = () => {
    if (authType == 'username_password') {
      addTray(url, username, password)
    } else  {
      addTrayUsingToken(url, authToken)
    }
    setUrl('')
    setUsername('')
    setPassword('')
    setAuthToken('')
  }

  function getAuthFields() {
    if (authType == "access_token") {
      return (<div>
        <Input className={styles.authToken}
               value={authToken}
               onChange={({target}) => setAuthToken(target.value)}
               onEnter={addTrayAndClearInput}
               data-locator='add-tray-access-token'
               autoComplete='token'>
          <span className={styles.label}>Token</span>
        </Input>
      </div>)
    }
    return (<div>
      <Input className={styles.username}
             value={username}
             onChange={({target}) => setUsername(target.value)}
             onEnter={addTrayAndClearInput}
             data-locator='add-tray-username'
             autoComplete='username'>
        <span className={styles.label}>username</span>
      </Input>
      <Password className={styles.password}
                value={password}
                onChange={({target}) => setPassword(target.value)}
                onEnter={addTrayAndClearInput}
                data-locator='add-tray-password'>
        <span className={styles.label}>password</span>
      </Password>
    </div>);
  }

  return (
    <div className={styles.addTray}>
      <div className={styles.inputs}>
        <Input className={styles.url}
               placeholder='CCTray XML feed'
               value={url}
               onChange={({target}) => setUrl(target.value)}
               onEnter={addTrayAndClearInput}
               data-locator='add-tray-url'
               autoComplete='url'>
          <span className={styles.label}>URL</span>
        </Input>
        <div className={styles.authTypes}>
          <label>
            <input
              type="radio"
              name="auth"
              id='username_password'
              value="username_password"
              checked={authType === "username_password"}
              onChange={({target}) => setAuthType(target.value)}/> Basic Auth
          </label>
          <label>
            <input
              type="radio"
              name="auth"
              id="access_token"
              value="access_token"
              checked={authType === "access_token"}
              onChange={({target}) => setAuthType(target.value)}/> AccessToken
          </label>
        </div>
        {getAuthFields()}
      </div>
      <WithHelp title='Tracking'
                help={<TrackingHelp addTray={addTray}/>}
                className={styles.help}>
        <PrimaryButton className={styles.add}
                       onClick={addTrayAndClearInput}
                       data-locator='add-tray'
                       icon={iPlus}>
          <span aria-label='add tray'>add</span>
        </PrimaryButton>
      </WithHelp>
    </div>
  )
}
