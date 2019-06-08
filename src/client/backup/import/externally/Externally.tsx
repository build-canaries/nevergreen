import React, {ChangeEvent, ReactElement, useState} from 'react'
import {IdInput} from '../../IdInput'
import {WithHelp} from '../../../common/ContextualHelp'
import styles from './externally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
import {UrlInput} from '../../UrlInput'
import {Password} from '../../../common/forms/Password'
import {Messages, MessagesType} from '../../../common/Messages'
import {isBlank} from '../../../common/Utils'
import {send} from '../../../gateways/Gateway'
import {importConfiguration, ImportResponse} from '../../../gateways/BackupGateway'
import {Configuration, toConfiguration} from '../../../reducers/Configuration'
import {isEmpty} from 'lodash'

interface ExternallyProps {
  location: string;
  backupSetId: (id: string) => void;
  backupSetUrl: (url: string) => void;
  id: string;
  url: string;
  help: ReactElement;
  accessTokenRequired?: boolean;
  setConfiguration: (configuration: Configuration) => void;
}

function validate(id: string, url: string, accessToken: string, accessTokenRequired?: boolean): string[] {
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

export function Externally({location, id, url, backupSetId, backupSetUrl, help, accessTokenRequired, setConfiguration}: ExternallyProps) {
  const [accessToken, setAccessToken] = useState('')
  const [loaded, setLoaded] = useState(true)
  const [messages, setMessages] = useState<string[]>([])
  const [messageType, setMessageType] = useState(MessagesType.INFO)

  const disabled = !loaded
  const accessTokenChanged = ({target}: ChangeEvent<HTMLInputElement>) => setAccessToken(target.value)

  const setErrors = (errors: string[]) => {
    setMessageType(MessagesType.ERROR)
    setMessages(errors)
  }

  const setInfos = (infos: string[]) => {
    setMessageType(MessagesType.INFO)
    setMessages(infos)
  }

  const restore = async () => {
    const validationErrors = validate(id, url, accessToken, accessTokenRequired)

    if (isEmpty(validationErrors)) {
      setLoaded(false)
      setMessages([])
      try {
        const res = await send<ImportResponse>(importConfiguration(location, id, accessToken, url))
        const [dataErrors, configuration] = toConfiguration(res.configuration)
        if (isEmpty(dataErrors)) {
          setInfos(['Successfully imported configuration'])
          setConfiguration(configuration as Configuration)
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
        <UrlInput key={url}
                  url={url}
                  setUrl={backupSetUrl}
                  disabled={disabled}/>
      </WithHelp>
      <IdInput key={id}
               id={id}
               setId={backupSetId}
               disabled={disabled}/>
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
