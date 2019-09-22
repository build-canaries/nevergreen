import React, {useState} from 'react'
import {Input} from '../common/forms/Input'
import {WithHelp} from '../common/ContextualHelp'
import {TrackingHelp} from './TrackingHelp'
import styles from './add-tray.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iPlus} from '../common/fonts/Icons'
import {Auth} from './Auth'
import {AuthTypes, createId, Tray} from '../domain/Tray'
import {isBlank} from '../common/Utils'
import {getTrays} from './TraysReducer'
import {ensureHasScheme, removeScheme} from '../domain/Url'
import {highlightTray, trayAddedWithAuth} from './TrackingActionCreators'
import {refreshTray} from './RefreshThunkActionCreators'
import {useDispatch, useSelector} from 'react-redux'
import {send} from '../gateways/Gateway'
import {encrypt, EncryptResponse} from '../gateways/SecurityGateway'
import {Messages, MessagesType} from '../common/Messages'

function urlMatches(tray: Tray, url: string): boolean {
  return removeScheme(url) === removeScheme(tray.url)
}

export function AddTray() {
  const dispatch = useDispatch()
  const existingTrays = useSelector(getTrays)

  const [url, setUrl] = useState('')
  const [authType, setAuthType] = useState(AuthTypes.none)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [errors, setErrors] = useState<ReadonlyArray<string>>([])
  const [adding, setAdding] = useState(false)

  const resetForm = () => {
    setUrl('')
    setAuthType(AuthTypes.none)
    setUsername('')
    setPassword('')
    setAccessToken('')
  }

  const addTray = async () => {
    if (isBlank(url)) {
      setErrors(['Please enter the URL to the CCTray XML feed'])
      return
    }

    setAdding(true)

    const updatedUrl = ensureHasScheme(url)
    const existingTray = existingTrays.find((tray: Tray) => urlMatches(tray, updatedUrl))

    if (existingTray) {
      dispatch(highlightTray(existingTray.trayId))
      resetForm()
    } else {
      const trayId = createId()

      let encryptedPassword = ''
      let encryptedAccessToken = ''

      try {
        if (authType === AuthTypes.basic && !isBlank(password)) {
          encryptedPassword = await send<EncryptResponse>(encrypt(password))
        } else if (authType === AuthTypes.token && !isBlank(accessToken)) {
          encryptedAccessToken = await send<EncryptResponse>(encrypt(accessToken))
        }
        dispatch(trayAddedWithAuth(trayId, updatedUrl, authType, username, encryptedPassword, encryptedAccessToken))
        dispatch(refreshTray(trayId))
        resetForm()
      } catch (error) {
        setErrors([error.message])
      }
    }

    setAdding(false)
  }

  return (
    <div className={styles.addTray}>
      <div className={styles.inputs}>
        <Input className={styles.url}
               placeholder='CCTray XML feed'
               value={url}
               onChange={({target}) => {
                 setErrors([])
                 setUrl(target.value)
               }}
               onEnter={addTray}
               data-locator='add-tray-url'
               autoComplete='url'
               disabled={adding}>
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
              onEnter={addTray}/>
        <Messages type={MessagesType.ERROR} messages={errors}/>
      </div>
      <WithHelp title='Tracking'
                help={<TrackingHelp addTray={(url) => {
                  setUrl(url)
                  addTray()
                }}/>}
                className={styles.help}>
        <PrimaryButton className={styles.add}
                       onClick={addTray}
                       data-locator='add-tray'
                       icon={iPlus}
                       disabled={adding}>
          <span aria-label='add tray'>add</span>
        </PrimaryButton>
      </WithHelp>
    </div>
  )
}
