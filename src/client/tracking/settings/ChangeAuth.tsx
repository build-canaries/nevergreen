import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {PrimaryButton, SecondaryButton} from '../../common/forms/Button'
import {iCross, iFloppyDisk} from '../../common/fonts/Icons'
import {Modal} from '../../common/Modal'
import {Auth} from '../Auth'
import {AuthTypes} from '../../domain/Tray'
import styles from './change-auth.scss'
import {errorMessage, isBlank} from '../../common/Utils'
import {Request, send} from '../../gateways/Gateway'
import {encrypt, EncryptResponse} from '../../gateways/SecurityGateway'
import {Messages, MessagesType} from '../../common/Messages'

interface ChangeAuthProps {
  readonly show: boolean;
  readonly cancel: () => void;
  readonly save: (auth: AuthTypes, username: string, password: string, accessToken: string) => void;
  readonly authType: AuthTypes;
  readonly username: string;
}

export function ChangeAuth({show, cancel, save, authType, username}: ChangeAuthProps): ReactElement {
  const [newAuthType, setAuthType] = useState(authType)
  const [newUsername, setUsername] = useState(username)
  const [newPassword, setPassword] = useState('')
  const [newAccessToken, setAccessToken] = useState('')
  const [encryptionError, setEncryptionError] = useState('')
  const [encrypting, setEncrypting] = useState(false)
  const pendingRequest = useRef<Request<EncryptResponse>>()

  useEffect(() => setAuthType(authType), [authType])
  useEffect(() => setUsername(username), [username])

  const resetForm = () => {
    setEncryptionError('')
    setPassword('')
    setAccessToken('')
  }

  const saveChanges = async () => {
    setEncrypting(true)

    try {
      if (newAuthType === AuthTypes.basic && !isBlank(newPassword)) {
        pendingRequest.current = encrypt(newPassword)
        const encryptedPassword = await send(pendingRequest.current)
        save(newAuthType, newUsername, encryptedPassword, '')
      } else if (newAuthType === AuthTypes.token && !isBlank(newAccessToken)) {
        pendingRequest.current = encrypt(newAccessToken)
        const encryptedAccessToken = await send(pendingRequest.current)
        save(newAuthType, '', '', encryptedAccessToken)
      } else {
        save(newAuthType, '', '', '')
      }
      resetForm()
    } catch (error) {
      setEncryptionError(errorMessage(error))
    }
    // eslint-disable-next-line require-atomic-updates
    pendingRequest.current = undefined
    setEncrypting(false)
  }

  const discardChanges = () => {
    setUsername(username)
    setAuthType(authType)
    resetForm()
    cancel()
  }

  useEffect(() => {
    return () => {
      if (pendingRequest.current) {
        pendingRequest.current.abort()
      }
    }
  }, [])

  return (
    <Modal title='Change authentication'
           show={show}
           close={discardChanges}>
      <div className={styles.content}
           data-locator='change-authentication'>
        <div className={styles.auth}>
          <Auth authType={newAuthType}
                setAuthType={setAuthType}
                username={newUsername}
                setUsername={setUsername}
                password={newPassword}
                setPassword={setPassword}
                accessToken={newAccessToken}
                setAccessToken={setAccessToken}
                onEnter={saveChanges}
                disabled={encrypting}/>
        </div>
        <div>
          <SecondaryButton className={styles.changePasswordButtons}
                           icon={iCross}
                           onClick={discardChanges}
                           data-locator='change-password-cancel'>
            Discard changes
          </SecondaryButton>
          <PrimaryButton className={styles.changePasswordButtons}
                         icon={iFloppyDisk}
                         onClick={saveChanges}
                         disabled={encrypting}
                         data-locator='change-password-update'>
            Save changes
          </PrimaryButton>
        </div>
        <Messages type={MessagesType.ERROR} messages={encryptionError}/>
      </div>
    </Modal>
  )
}
