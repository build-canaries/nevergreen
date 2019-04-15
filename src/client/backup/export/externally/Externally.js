import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../../../common/forms/Input'
import {IdInput} from '../../IdInput'
import {WithHelp} from '../../../common/ContextualHelp'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudUpload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import styles from './externally.scss'
import {UrlInput} from '../../UrlInput'

export function Externally({location, description, loaded, id, url, backupSetId, backupSetDescription, upload, backupSetUrl, help}) {
  const [accessToken, setAccessToken] = useState('')
  const [newDescription, setNewDescription] = useState(description)

  const disabled = !loaded
  const accessTokenChanged = ({target}) => setAccessToken(target.value)

  return (
    <>
      <WithHelp title={`Export to ${location}`}
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
      <Password className={styles.accessToken}
                onChange={accessTokenChanged}
                onBlur={accessTokenChanged}
                value={accessToken}
                disabled={disabled}>
        <div className={styles.label}>access token</div>
      </Password>
      <Input value={newDescription}
             onChange={({target}) => setNewDescription(target.value)}
             onBlur={() => backupSetDescription(newDescription)}
             disabled={disabled}
             maxLength='256'>
        <div className={styles.label}>description</div>
      </Input>
      <PrimaryButton className={styles.export}
                     onClick={() => upload(accessToken)}
                     disabled={disabled}
                     icon={iCloudUpload}>
        export
      </PrimaryButton>
    </>
  )
}

Externally.propTypes = {
  location: PropTypes.string.isRequired,
  upload: PropTypes.func.isRequired,
  backupSetId: PropTypes.func.isRequired,
  backupSetDescription: PropTypes.func.isRequired,
  backupSetUrl: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  help: PropTypes.node.isRequired,
  loaded: PropTypes.bool
}
