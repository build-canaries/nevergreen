import React, {ChangeEvent, useLayoutEffect, useState} from 'react'
import styles from './externally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import {Messages, MessagesType} from '../../../common/Messages'
import {isBlank} from '../../../common/Utils'
import {send} from '../../../gateways/Gateway'
import {fetchConfiguration, ImportResponse} from '../../../gateways/BackupGateway'
import {toConfiguration} from '../../../configuration/Configuration'
import {isEmpty} from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import {State} from '../../../Reducer'
import {getBackupId, getBackupUrl} from '../../BackupReducer'
import {BackupLocation, backupSetId, backupSetUrl, configurationImported} from '../../BackupActionCreators'
import {Input} from '../../../common/forms/Input'
import {isRight} from 'fp-ts/lib/Either'

interface ExternallyProps {
  readonly location: BackupLocation;
  readonly accessTokenRequired?: boolean;
}

function validate(id: string, url: string, accessToken: string, accessTokenRequired?: boolean): ReadonlyArray<string> {
  const errors = []
  if (isBlank(id)) {
    errors.push('You must provide an ID to import')
  }
  if (isBlank(url)) {
    errors.push('You must provide a URL to import from')
  }
  if (accessTokenRequired && isBlank(accessToken)) {
    errors.push('You must provide an access token to import')
  }
  return errors
}

export function Externally({location, accessTokenRequired}: ExternallyProps) {
  const dispatch = useDispatch()
  const id = useSelector<State, string>((state) => getBackupId(location, state))
  const url = useSelector<State, string>((state) => getBackupUrl(location, state))

  const [newUrl, setNewUrl] = useState(url)
  const [newId, setNewId] = useState(id)

  useLayoutEffect(() => setNewUrl(url), [url])
  useLayoutEffect(() => setNewId(id), [id])

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

  const restore = async () => {
    const validationErrors = validate(newId, newUrl, accessToken, accessTokenRequired)

    if (isEmpty(validationErrors)) {
      setLoaded(false)
      setMessages([])
      try {
        const res = await send<ImportResponse>(fetchConfiguration(location, newId, accessToken, newUrl))
        const result = toConfiguration(res.configuration)
        if (isRight(result)) {
          setInfos(['Successfully imported configuration'])
          dispatch(configurationImported(result.right))
        } else {
          setErrors(result.left)
        }
      } catch (error) {
        setErrors([error.message])
      }
      setLoaded(true)
    } else {
      setErrors(validationErrors)
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
      {accessTokenRequired && (
        <Password className={styles.accessToken}
                  onChange={accessTokenChanged}
                  onBlur={accessTokenChanged}
                  value={accessToken}
                  disabled={disabled}>
          <div className={styles.label}>access token</div>
        </Password>
      )}
      <PrimaryButton className={styles.import}
                     onClick={restore}
                     disabled={disabled}
                     icon={iCloudDownload}
                     data-locator='import-externally'>
        import
      </PrimaryButton>
      <Messages type={messageType}
                messages={messages}
                data-locator='messages'/>
    </>
  )
}
