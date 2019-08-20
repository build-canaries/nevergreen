import React, {ChangeEvent, ReactElement, useState} from 'react'
import {Input} from '../../../common/forms/Input'
import {IdInput} from '../../IdInput'
import {WithHelp} from '../../../common/ContextualHelp'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudUpload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import styles from './externally.scss'
import {UrlInput} from '../../UrlInput'
import {Messages, MessagesType} from '../../../common/Messages'
import {BackupLocation} from '../../BackupActionCreators'
import {exportConfiguration, ExportResponse} from '../../../gateways/BackupGateway'
import {isBlank} from '../../../common/Utils'
import {send} from '../../../gateways/Gateway'

interface ExternallyProps {
  location: BackupLocation;
  backupSetId: (location: BackupLocation, id: string) => void;
  backupSetDescription: (location: BackupLocation, description: string) => void;
  backupSetUrl: (location: BackupLocation, url: string) => void;
  id: string;
  description: string;
  url: string;
  help: ReactElement;
  configuration: string;
}

export function Externally({location, description, id, url, backupSetId, backupSetDescription, backupSetUrl, configuration, help}: ExternallyProps) {
  const [accessToken, setAccessToken] = useState('')
  const [newDescription, setNewDescription] = useState(description)
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

  const upload = async () => {
    if (isBlank(accessToken)) {
      setErrors(['You must provide an access token to export'])
    } else {
      setLoaded(false)
      setMessages([])
      try {
        const res = await send<ExportResponse>(exportConfiguration(location, id, description, configuration, accessToken, url))
        setInfos(['Successfully exported configuration'])
        backupSetId(location, res.id)
      } catch (error) {
        setErrors([`Unable to export to ${location} because of an error`, error.message])
      }
      setLoaded(true)
    }
  }

  return (
    <>
      <WithHelp title={`Export to ${location}`}
                containerClassName={styles.helpContainer}
                help={help}>
        <UrlInput key={url}
                  url={url}
                  setUrl={(value) => backupSetUrl(location, value)}
                  disabled={disabled}/>
      </WithHelp>
      <IdInput key={id}
               id={id}
               setId={(value) => backupSetId(location, value)}
               disabled={disabled}/>
      <Password className={styles.accessToken}
                onChange={accessTokenChanged}
                onBlur={accessTokenChanged}
                value={accessToken}
                disabled={disabled}
                data-locator='access-token'>
        <div className={styles.label}>access token</div>
      </Password>
      <Input value={newDescription}
             onChange={({target}) => setNewDescription(target.value)}
             onBlur={() => backupSetDescription(location, newDescription)}
             disabled={disabled}
             maxLength={256}>
        <div className={styles.label}>description</div>
      </Input>
      <PrimaryButton className={styles.export}
                     onClick={upload}
                     disabled={disabled}
                     icon={iCloudUpload}
                     data-locator='export'>
        export
      </PrimaryButton>
      <Messages type={messageType}
                messages={messages}
                data-locator='messages'/>
    </>
  )
}
