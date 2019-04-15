import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {IdInput} from '../../IdInput'
import {WithHelp} from '../../../common/ContextualHelp'
import styles from './externally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
import {UrlInput} from '../../UrlInput'
import {Password} from '../../../common/forms/Password'

export function Externally({location, id, url, backupSetId, loaded, restore, backupSetUrl, help, accessTokenRequired}) {
  const [accessToken, setAccessToken] = useState('')

  const disabled = !loaded
  const accessTokenChanged = ({target}) => setAccessToken(target.value)

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

Externally.propTypes = {
  location: PropTypes.string.isRequired,
  restore: PropTypes.func.isRequired,
  backupSetId: PropTypes.func.isRequired,
  backupSetUrl: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  help: PropTypes.node.isRequired,
  loaded: PropTypes.bool,
  accessTokenRequired: PropTypes.bool
}
