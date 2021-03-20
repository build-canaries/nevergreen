import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {Modal} from '../../common/Modal'
import {Auth} from '../Auth'
import {AuthTypes} from '../../domain/Tray'
import styles from './change-auth.scss'
import {isBlank} from '../../common/Utils'
import {Request, send} from '../../gateways/Gateway'
import {encrypt, EncryptResponse} from '../../gateways/SecurityGateway'
import {Form} from '../../common/forms/Form'

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
  const pendingRequest = useRef<Request<EncryptResponse>>()

  useEffect(() => setAuthType(authType), [authType])
  useEffect(() => setUsername(username), [username])

  const resetForm = () => {
    setPassword('')
    setAccessToken('')
  }

  const saveChanges = async () => {
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
    // eslint-disable-next-line require-atomic-updates
    pendingRequest.current = undefined
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
      <Form onSuccess={saveChanges}
            onValidate={() => []}
            onCancel={discardChanges}
            className={styles.content}>
        {(submitting) => {
          return (
            <Auth authType={newAuthType}
                  setAuthType={setAuthType}
                  username={newUsername}
                  setUsername={setUsername}
                  password={newPassword}
                  setPassword={setPassword}
                  accessToken={newAccessToken}
                  setAccessToken={setAccessToken}
                  disabled={submitting}/>
          )
        }}
      </Form>
    </Modal>
  )
}
