import React, {ReactElement, useState} from 'react'
import {DropDown} from '../../common/forms/DropDown'
import {useDispatch} from 'react-redux'
import {isBlank} from '../../common/Utils'
import {DEFAULT_GITHUB_URL, DEFAULT_GITLAB_URL, RemoteLocationOptions} from './RemoteLocationOptions'
import {addBackupCustomServer, addBackupGitHubLab} from './BackupActionCreators'
import {Input} from '../../common/forms/Input'
import {Password} from '../../common/forms/Password'
import {send} from '../../gateways/Gateway'
import {encrypt} from '../../gateways/SecurityGateway'
import styles from './add-backup.scss'
import {isValidHttpUrl} from '../../domain/Url'
import {firstError, FormErrors} from '../../common/forms/Validation'
import {Form} from '../../common/forms/Form'
import {ROUTE_SETTINGS_BACKUP} from '../../Routes'
import {Page} from '../../common/Page'
import {BackupLogo} from './logo/BackupLogo'

type Fields = 'url' | 'accessToken'

export function AddBackup(): ReactElement {
  const dispatch = useDispatch()

  const [where, setWhere] = useState(RemoteLocationOptions.Custom)
  const [url, setUrl] = useState('')
  const [id, setId] = useState('')
  const [description, setDescription] = useState('Nevergreen configuration backup')
  const [accessToken, setAccessToken] = useState('')

  const onValidate = () => {
    const validationErrors: FormErrors<Fields> = []

    if (isBlank(url)) {
      validationErrors.push({field: 'url', message: 'Enter a URL'})
    } else if (!isValidHttpUrl(url)) {
      validationErrors.push({field: 'url', message: 'Only http and https URLs are supported'})
    }

    if (where === RemoteLocationOptions.GitLab || where === RemoteLocationOptions.GitHub) {
      if (isBlank(accessToken)) {
        validationErrors.push({field: 'accessToken', message: 'Enter an access token'})
      }
    }

    return validationErrors
  }

  const onSuccess = async () => {
    if (where === RemoteLocationOptions.GitLab || where === RemoteLocationOptions.GitHub) {
      const encryptedAccessToken = await send(encrypt(accessToken))
      dispatch(addBackupGitHubLab(where, id, url, description, encryptedAccessToken))
    } else {
      dispatch(addBackupCustomServer(url))
    }
    return ROUTE_SETTINGS_BACKUP
  }

  const updateWhere = (updatedWhere: RemoteLocationOptions) => {
    if (updatedWhere === RemoteLocationOptions.Custom) {
      setUrl('')
    } else if (updatedWhere === RemoteLocationOptions.GitHub) {
      setUrl(DEFAULT_GITHUB_URL)
    } else if (updatedWhere === RemoteLocationOptions.GitLab) {
      setUrl(DEFAULT_GITLAB_URL)
    }
    setWhere(updatedWhere)
  }

  const isCustomServer = where === RemoteLocationOptions.Custom

  return (
    <Page title='Add backup'>
      <Form onValidate={onValidate}
            onSuccess={onSuccess}
            submitButtonText='Add location'
            onCancel={ROUTE_SETTINGS_BACKUP}>
        {(submitting, validationErrors, clearErrors) => {
          return (
            <>
              <div className={styles.whereContainer}>
                <DropDown className={styles.where}
                          value={where}
                          options={[
                            {value: RemoteLocationOptions.Custom, display: 'Custom server'},
                            {value: RemoteLocationOptions.GitHub, display: 'GitHub gist'},
                            {value: RemoteLocationOptions.GitLab, display: 'GitLab snippet'}
                          ]}
                          onChange={({target}) => {
                            updateWhere(target.value as RemoteLocationOptions)
                            clearErrors()
                          }}
                          disabled={submitting}>
                  Where
                </DropDown>
                <BackupLogo where={where} width={44} height={44}/>
              </div>
              <Input value={url}
                     onChange={({target}) => {
                       setUrl(target.value)
                     }}
                     type='url'
                     autoComplete='url'
                     error={firstError<Fields>('url', validationErrors)}
                     disabled={submitting}>
                URL
              </Input>
              {!isCustomServer && (
                <>
                  <Input className={styles.id}
                         value={id}
                         onChange={({target}) => {
                           setId(target.value)
                         }}
                         disabled={submitting}>
                    ID
                  </Input>
                  <Password className={styles.password}
                            value={accessToken}
                            onChange={({target}) => {
                              setAccessToken(target.value)
                            }}
                            error={firstError<Fields>('accessToken', validationErrors)}
                            disabled={submitting}>
                    Access token
                  </Password>
                  <Input value={description}
                         onChange={({target}) => {
                           setDescription(target.value)
                         }}
                         maxLength={256}
                         disabled={submitting}>
                    Description
                  </Input>
                </>
              )}
            </>
          )
        }}
      </Form>
    </Page>
  )
}
