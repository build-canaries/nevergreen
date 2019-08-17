import React, {useLayoutEffect, useState} from 'react'
import {PrimaryButton, SecondaryButton} from '../../common/forms/Button'
import {iCross, iFloppyDisk} from '../../common/fonts/Icons'
import {Modal} from '../../common/Modal'
import {Auth} from '../Auth'
import {AuthDetails, AuthTypes} from '../../domain/Tray'
import styles from './change-auth.scss'

interface ChangeAuthProps {
  show: boolean;
  cancel: () => void;
  save: (auth: AuthDetails) => void;
  authType: AuthTypes;
  username: string;
}

export function ChangeAuth({show, cancel, save, authType, username}: ChangeAuthProps) {
  const [newAuthType, setAuthType] = useState(authType)
  const [newUsername, setUsername] = useState(username)
  const [newPassword, setPassword] = useState('')
  const [newAccessToken, setAccessToken] = useState('')

  const saveChanges = () => {
    save({
      type: newAuthType,
      username: newUsername,
      password: newPassword,
      accessToken: newAccessToken
    })
    setPassword('')
    setAccessToken('')
  }

  const discardChanges = () => {
    setUsername(username)
    setAuthType(authType)
    setPassword('')
    setAccessToken('')
    cancel()
  }

  useLayoutEffect(() => setAuthType(authType), [authType])
  useLayoutEffect(() => setUsername(username), [username])

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
                onEnter={saveChanges}/>
        </div>
        <div>
          <SecondaryButton className={styles.changePasswordButtons}
                           icon={iCross}
                           onClick={discardChanges}
                           data-locator='change-password-cancel'>
            discard changes
          </SecondaryButton>
          <PrimaryButton className={styles.changePasswordButtons}
                         icon={iFloppyDisk}
                         onClick={saveChanges}
                         data-locator='change-password-update'>
            save changes
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}
