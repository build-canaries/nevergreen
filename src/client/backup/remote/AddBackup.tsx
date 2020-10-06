import React, {FormEvent, ReactElement, useState} from 'react'
import {isEmpty} from 'lodash'
import cn from 'classnames'
import {PrimaryButton} from '../../common/forms/Button'
import {iPlus} from '../../common/fonts/Icons'
import {DropDown} from '../../common/forms/DropDown'
import {useDispatch} from 'react-redux'
import {Messages, MessagesType} from '../../common/Messages'
import {errorMessage, isBlank} from '../../common/Utils'
import {DEFAULT_GITHUB_URL, DEFAULT_GITLAB_URL, RemoteLocationOptions} from './RemoteLocationOptions'
import {addBackupGitHubLab, addBackupCustomServer} from './RemoteLocationActionCreators'
import {Input} from '../../common/forms/Input'
import {Password} from '../../common/forms/Password'
import {send} from '../../gateways/Gateway'
import {encrypt, EncryptResponse} from '../../gateways/SecurityGateway'
import styles from './add-backup.scss'
import {isHttp} from '../../domain/Url'
import {RemoteLocationLogo} from './RemoteLocationLogo'

export function AddBackup(): ReactElement {
  const dispatch = useDispatch()

  const [where, setWhere] = useState(RemoteLocationOptions.Custom)
  const [url, setUrl] = useState('')
  const [id, setId] = useState('')
  const [description, setDescription] = useState('Nevergreen configuration backup')
  const [accessToken, setAccessToken] = useState('')
  const [errors, setErrors] = useState<ReadonlyArray<string>>([])
  const [adding, setAdding] = useState(false)

  const doAddBackup = async (evt: FormEvent) => {
    evt.preventDefault()

    const validationErrors = []

    if (isBlank(url)) {
      validationErrors.push('Please enter the URL')
    } else if (!isHttp(url)) {
      validationErrors.push('Only http and https URLs are supported')
    }

    if (where === RemoteLocationOptions.GitLab || where === RemoteLocationOptions.GitHub) {
      if (isBlank(accessToken)) {
        validationErrors.push('Please enter an access token')
      }
    }

    if (!isEmpty(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    if (where === RemoteLocationOptions.GitLab || where === RemoteLocationOptions.GitHub) {
      try {
        setAdding(true)
        const encryptedAccessToken = await send<EncryptResponse>(encrypt(accessToken))
        setAdding(false)
        dispatch(addBackupGitHubLab(where, id, url, description, encryptedAccessToken))
      } catch (e) {
        setErrors([errorMessage(e)])
      }
    } else {
      dispatch(addBackupCustomServer(url))
    }
  }

  const updateWhere = (updatedWhere: RemoteLocationOptions) => {
    if (updatedWhere === RemoteLocationOptions.Custom) {
      setUrl('')
    } else if (updatedWhere === RemoteLocationOptions.GitHub) {
      setUrl(DEFAULT_GITHUB_URL)
    } else if (updatedWhere === RemoteLocationOptions.GitLab) {
      setUrl(DEFAULT_GITLAB_URL)
    }
    setErrors([])
    setWhere(updatedWhere)
  }

  const isCustomServer = where === RemoteLocationOptions.Custom

  return (
    <form className={styles.addBackup}
          onSubmit={doAddBackup}>
      <div className={styles.whereContainer}>
        <DropDown className={styles.where}
                  value={where}
                  options={[
                    {value: RemoteLocationOptions.Custom, display: 'Custom server'},
                    {value: RemoteLocationOptions.GitHub, display: 'GitHub gist'},
                    {value: RemoteLocationOptions.GitLab, display: 'GitLab snippet'}
                  ]}
                  onChange={({target}) => updateWhere(target.value as RemoteLocationOptions)}
                  disabled={adding}>
          <span className={styles.label}>Where</span>
        </DropDown>
        <RemoteLocationLogo where={where}/>
      </div>
      <Input value={url}
             onChange={({target}) => {
               setErrors([])
               setUrl(target.value)
             }}
             autoComplete='url'
             disabled={adding}>
        <span className={styles.label}>URL</span>
      </Input>
      <Input className={cn(styles.id, {[styles.gitHubLabOnly]: isCustomServer})}
             value={id}
             onChange={({target}) => {
               setErrors([])
               setId(target.value)
             }}
             disabled={adding || isCustomServer}
             aria-hidden={isCustomServer}>
        <span className={styles.label}>ID</span>
      </Input>
      <Password className={cn(styles.accessToken, {[styles.gitHubLabOnly]: isCustomServer})}
                value={accessToken}
                onChange={({target}) => {
                  setErrors([])
                  setAccessToken(target.value)
                }}
                disabled={adding || isCustomServer}
                aria-hidden={isCustomServer}
                data-locator='access-token'>
        <span className={styles.label}>Access token</span>
      </Password>
      <Input className={cn({[styles.gitHubLabOnly]: isCustomServer})}
             value={description}
             onChange={({target}) => {
               setErrors([])
               setDescription(target.value)
             }}
             maxLength={256}
             disabled={adding || isCustomServer}
             aria-hidden={isCustomServer}>
        <span className={styles.label}>Description</span>
      </Input>
      <Messages type={MessagesType.ERROR} messages={errors}/>
      <PrimaryButton className={styles.add}
                     icon={iPlus}
                     type='submit'
                     disabled={adding}>
        Add location
      </PrimaryButton>
    </form>
  )
}
