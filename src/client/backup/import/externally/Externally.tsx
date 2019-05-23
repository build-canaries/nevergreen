import React, {ChangeEvent, ReactElement, useState} from 'react'
import {IdInput} from '../../IdInput'
import {WithHelp} from '../../../common/ContextualHelp'
import styles from './externally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
import {UrlInput} from '../../UrlInput'
import {Password} from '../../../common/forms/Password'

interface ExternallyProps {
  location: string;
  restore: (token: string) => void;
  backupSetId: (id: string) => void;
  backupSetUrl: (url: string) => void;
  id: string;
  url: string;
  help: ReactElement;
  loaded?: boolean;
  accessTokenRequired?: boolean;
}

export function Externally({location, id, url, backupSetId, loaded, restore, backupSetUrl, help, accessTokenRequired}: ExternallyProps) {
  const [accessToken, setAccessToken] = useState('')

  const disabled = !loaded
  const accessTokenChanged = ({target}: ChangeEvent<HTMLInputElement>) => setAccessToken(target.value)

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
                     onClick={() => restore(accessToken)}
                     disabled={disabled}
                     icon={iCloudDownload}>
        import
      </PrimaryButton>
    </>
  )
}
