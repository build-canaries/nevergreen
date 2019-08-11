import React, {useState} from 'react'
import {Input} from '../common/forms/Input'
import {WithHelp} from '../common/ContextualHelp'
import {TrackingHelp} from './TrackingHelp'
import styles from './add-tray.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iPlus} from '../common/fonts/Icons'
import {Auth} from './Auth'
import {AuthDetails, AuthTypes} from '../domain/Tray'

interface AddTrayProps {
  addTray: (url: string, auth: AuthDetails) => void;
}

export function AddTray({addTray}: AddTrayProps) {
  const [url, setUrl] = useState('')
  const [authType, setAuthType] = useState(AuthTypes.none)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const addTrayAndClearInput = () => {
    addTray(url, {type: authType, username, password, accessToken})
    setUrl('')
    setAuthType(AuthTypes.none)
    setUsername('')
    setPassword('')
    setAccessToken('')
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
        <Auth authType={authType}
              setAuthType={setAuthType}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              onEnter={addTrayAndClearInput}/>
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
