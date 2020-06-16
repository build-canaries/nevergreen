import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react'
import {Input} from '../../../common/forms/Input'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudUpload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import styles from './externally.scss'
import {Messages, MessagesType} from '../../../common/Messages'
import {BackupLocation, backupSetDescription, backupSetId, backupSetUrl} from '../../BackupActionCreators'
import {exportConfiguration, ExportResponse} from '../../../gateways/BackupGateway'
import {errorMessage, isBlank} from '../../../common/Utils'
import {send} from '../../../gateways/Gateway'
import {useDispatch, useSelector} from 'react-redux'
import {getConfiguration} from '../../../configuration/Configuration'
import {getBackupDescription, getBackupId, getBackupUrl} from '../../BackupReducer'
import {State} from '../../../Reducer'

interface ExternallyProps {
  readonly location: BackupLocation;
}

export function Externally({location}: ExternallyProps): ReactElement {
  const dispatch = useDispatch()
  const configuration = useSelector(getConfiguration)
  const url = useSelector<State, string>((state) => getBackupUrl(location, state))
  const id = useSelector<State, string>((state) => getBackupId(location, state))
  const description = useSelector<State, string>((state) => getBackupDescription(location, state))

  const [newUrl, setNewUrl] = useState(url)
  const [newId, setNewId] = useState(id)
  const [newDescription, setNewDescription] = useState(description)

  useEffect(() => setNewUrl(url), [url])
  useEffect(() => setNewId(id), [id])
  useEffect(() => setNewDescription(description), [description])

  const [accessToken, setAccessToken] = useState('')
  const [loaded, setLoaded] = useState(true)
  const [messages, setMessages] = useState<ReadonlyArray<string>>([])
  const [messageType, setMessageType] = useState(MessagesType.INFO)

  const disabled = !loaded
  const accessTokenChanged = ({target}: ChangeEvent<HTMLInputElement>) => setAccessToken(target.value)

  const setErrors = (errors: ReadonlyArray<string>) => {
    setMessageType(MessagesType.ERROR)
    setMessages(errors)
  }

  const setInfos = (infos: ReadonlyArray<string>) => {
    setMessageType(MessagesType.INFO)
    setMessages(infos)
  }

  const upload = async () => {
    if (isBlank(accessToken)) {
      setErrors(['You must provide an access token to export'])
    } else {
      setLoaded(false)
      setMessages([])
      try {
        const res = await send<ExportResponse>(exportConfiguration(location, newId, newDescription, configuration, accessToken, newUrl))
        setInfos(['Successfully exported configuration'])
        dispatch(backupSetId(location, res.id))
      } catch (error) {
        setErrors([`Unable to export to ${location} because of an error`, errorMessage(error)])
      }
      setLoaded(true)
    }
  }

  return (
    <>
      <Input value={newUrl}
             onChange={({target}) => setNewUrl(target.value)}
             onBlur={() => dispatch(backupSetUrl(location, newUrl))}
             disabled={disabled}
             className={styles.url}>
        <div className={styles.label}>URL</div>
      </Input>
      <Input className={styles.id}
             value={newId}
             onChange={({target}) => setNewId(target.value)}
             onBlur={() => dispatch(backupSetId(location, newId))}
             disabled={disabled}>
        <div className={styles.label}>ID</div>
      </Input>
      <Password className={styles.accessToken}
                onChange={accessTokenChanged}
                onBlur={accessTokenChanged}
                value={accessToken}
                disabled={disabled}
                data-locator='access-token'>
        <div className={styles.label}>Access token</div>
      </Password>
      <Input value={newDescription}
             onChange={({target}) => setNewDescription(target.value)}
             onBlur={() => dispatch(backupSetDescription(location, newDescription))}
             disabled={disabled}
             maxLength={256}>
        <div className={styles.label}>Description</div>
      </Input>
      <PrimaryButton className={styles.export}
                     onClick={upload}
                     disabled={disabled}
                     icon={iCloudUpload}
                     data-locator='export'>
        Export
      </PrimaryButton>
      <Messages type={messageType}
                messages={messages}
                data-locator='messages'/>
    </>
  )
}
