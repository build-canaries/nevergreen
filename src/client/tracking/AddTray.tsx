import React, {ReactElement, useState} from 'react'
import {Input} from '../common/forms/Input'
import styles from './add-tray.scss'
import {Auth} from './Auth'
import {AuthTypes, createId, Tray} from '../domain/Tray'
import {isBlank} from '../common/Utils'
import {getTrays} from './TraysReducer'
import {isValidHttpUrl, removeScheme} from '../domain/Url'
import {trayAdded} from './TrackingActionCreators'
import {useDispatch, useSelector} from 'react-redux'
import {send} from '../gateways/Gateway'
import {encrypt} from '../gateways/SecurityGateway'
import {Form} from '../common/forms/Form'
import {firstError, FormErrors} from '../common/forms/Validation'
import {Page} from '../common/Page'
import {ROUTE_SETTINGS_TRACKING, routeFeedProjects} from '../Routes'
import {Xml} from '../common/icons/Xml'

type Fields = 'url'

function urlMatches(tray: Tray, url: string): boolean {
  return removeScheme(url) === removeScheme(tray.url)
}

export function AddTray(): ReactElement {
  const dispatch = useDispatch()
  const existingTrays = useSelector(getTrays)

  const [url, setUrl] = useState('')
  const [authType, setAuthType] = useState(AuthTypes.none)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const onValidate = () => {
    const validationErrors: FormErrors<Fields> = []

    if (isBlank(url)) {
      validationErrors.push({field: 'url', message: 'Enter a URL to the CCTray XML feed'})
    } else if (!isValidHttpUrl(url)) {
      validationErrors.push({field: 'url', message: 'Only http(s) URLs are supported'})
    }
    if (existingTrays.find((tray: Tray) => urlMatches(tray, url))) {
      validationErrors.push({field: 'url', message: 'CCTray XML feed has already been added'})
    }

    return validationErrors
  }

  const addTray = async () => {
    const trayId = createId()

    let encryptedPassword = ''
    let encryptedAccessToken = ''

    if (authType === AuthTypes.basic && !isBlank(password)) {
      encryptedPassword = await send(encrypt(password))
    } else if (authType === AuthTypes.token && !isBlank(accessToken)) {
      encryptedAccessToken = await send(encrypt(accessToken))
    }
    dispatch(trayAdded(trayId, url, authType, username, encryptedPassword, encryptedAccessToken))
    return routeFeedProjects(trayId, true)
  }

  return (
    <Page title='Add CCTray XML feed' icon={<Xml/>}>
      <Form onValidate={onValidate}
            onSuccess={addTray}
            submitButtonText='Add feed'
            onCancel={ROUTE_SETTINGS_TRACKING}>
        {(submitting, validationErrors) => {
          return (
            <>
              <Input className={styles.url}
                     placeholder='CCTray XML feed'
                     value={url}
                     onChange={({target}) => {
                       setUrl(target.value)
                     }}
                     data-locator='add-tray-url'
                     autoComplete='url'
                     error={firstError<Fields>('url', validationErrors)}
                     disabled={submitting}>
                URL
              </Input>
              <Auth authType={authType}
                    setAuthType={setAuthType}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    accessToken={accessToken}
                    setAccessToken={setAccessToken}/>
            </>
          )
        }}
      </Form>
    </Page>
  )
}
