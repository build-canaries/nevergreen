import React, {ChangeEvent, ReactElement, useLayoutEffect, useState} from 'react'
import {WithHelp} from '../../../common/ContextualHelp'
import styles from './externally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import {Messages, MessagesType} from '../../../common/Messages'
import {isBlank} from '../../../common/Utils'
import {send} from '../../../gateways/Gateway'
import {importConfiguration, ImportResponse} from '../../../gateways/BackupGateway'
import {Configuration, toConfiguration} from '../../../configuration/Configuration'
import {isEmpty} from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import {State} from '../../../Reducer'
import {getBackupId, getBackupUrl} from '../../BackupReducer'
import {BackupLocation, backupSetId, backupSetUrl} from '../../BackupActionCreators'
import {setConfiguration} from '../../../NevergreenActionCreators'
import {Input} from '../../../common/forms/Input'

interface ExternallyProps {
  readonly location: BackupLocation;
  readonly help: ReactElement;
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

export function Externally({location, help, accessTokenRequired}: ExternallyProps) {
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
        const res = await send<ImportResponse>(importConfiguration(location, newId, accessToken, newUrl))
        const [dataErrors, configuration] = toConfiguration(res.configuration)
        if (isEmpty(dataErrors)) {
          setInfos(['Successfully imported configuration'])
          dispatch(setConfiguration(configuration as Configuration))
        } else {
          setErrors(dataErrors)
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
      <WithHelp title={`Import from ${location}`}
                containerClassName={styles.helpContainer}
                help={help}>
        <Input value={newUrl}
               onChange={({target}) => setNewUrl(target.value)}
               onBlur={() => dispatch(backupSetUrl(location, newUrl))}
               disabled={disabled}
               className={styles.url}>
          <div className={styles.label}>URL</div>
        </Input>
      </WithHelp>
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
