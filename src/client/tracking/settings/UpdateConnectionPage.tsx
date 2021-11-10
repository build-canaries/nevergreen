import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {Page} from '../../common/Page'
import {AUTH_TYPE_OPTIONS, AuthTypes, Tray} from '../../domain/Tray'
import {useDispatch, useSelector} from 'react-redux'
import {trayUpdated} from '../TrackingActionCreators'
import {routeFeedDetails, routeFeedProjects} from '../../Routes'
import {Form} from '../../common/forms/Form'
import {Input} from '../../common/forms/Input'
import {firstError, FormErrors} from '../../common/forms/Validation'
import {isBlank} from '../../common/Utils'
import {isValidHttpUrl, removeScheme} from '../../domain/Url'
import {getTrays} from '../TraysReducer'
import {Request, send} from '../../gateways/Gateway'
import {encrypt, EncryptResponse} from '../../gateways/SecurityGateway'
import {Auth} from '../Auth'
import {FeedLogo} from '../FeedLogo'

interface UpdateConnectionPageProps {
  readonly feed: Tray;
}

enum KeepExistingAuth {
  keep = 'keep'
}

type ExtendedAuthTypes = KeepExistingAuth | AuthTypes;

type Fields = 'url'

function urlMatches(feed: Tray, url: string): boolean {
  return removeScheme(url) === removeScheme(feed.url)
}

const EXTENDED_AUTH_TYPE_OPTIONS = [
  {value: KeepExistingAuth.keep, display: 'Keep existing auth'},
  ...AUTH_TYPE_OPTIONS
]

export function UpdateConnectionPage({feed}: UpdateConnectionPageProps): ReactElement {
  const dispatch = useDispatch()
  const otherFeeds = useSelector(getTrays).filter((existing: Tray) => existing.trayId !== feed.trayId)

  const [url, setUrl] = useState(feed.url)
  const [authType, setAuthType] = useState<ExtendedAuthTypes>(KeepExistingAuth.keep)
  const [username, setUsername] = useState(feed.username || '')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const pendingRequest = useRef<Request<EncryptResponse>>()

  useEffect(() => {
    return () => {
      if (pendingRequest.current) {
        pendingRequest.current.abort()
      }
    }
  }, [])

  const onValidate = () => {
    const validationErrors: FormErrors<Fields> = []

    if (isBlank(url)) {
      validationErrors.push({field: 'url', message: 'Enter a URL'})
    } else if (!isValidHttpUrl(url)) {
      validationErrors.push({field: 'url', message: 'Only http(s) URLs are supported'})
    }
    if (otherFeeds.find((other) => urlMatches(other, url))) {
      validationErrors.push({field: 'url', message: 'An existing CCTray XML feed already has this URL'})
    }

    return validationErrors
  }

  const authUpdates = async () => {
    if (authType === KeepExistingAuth.keep) {
      return {}
    }
    const authData = {
      authType,
      username,
      encryptedPassword: feed.encryptedPassword,
      encryptedAccessToken: feed.encryptedAccessToken
    }
    if (authType === AuthTypes.basic && !isBlank(password)) {
      pendingRequest.current = encrypt(password)
      authData.encryptedPassword = await send(pendingRequest.current)
      authData.encryptedAccessToken = ''
    } else if (authType === AuthTypes.token && !isBlank(accessToken)) {
      pendingRequest.current = encrypt(accessToken)
      authData.username = ''
      authData.encryptedPassword = ''
      authData.encryptedAccessToken = await send(pendingRequest.current)
    } else {
      authData.username = ''
      authData.encryptedPassword = ''
      authData.encryptedAccessToken = ''
    }
    pendingRequest.current = undefined
    return authData
  }

  const updateDetails = async () => {
    const urlChanged = url !== feed.url
    const authChanged = authType !== KeepExistingAuth.keep && authType !== feed.authType
    const connectionChanged = urlChanged || authChanged
    const authData = await authUpdates()
    dispatch(trayUpdated(feed.trayId, {
      url,
      ...authData
    }))
    return connectionChanged
      ? routeFeedProjects(feed.trayId, true)
      : routeFeedDetails(feed.trayId)
  }

  return (
    <Page title='Update connection' icon={<FeedLogo feed={feed}/>}>
      <Form onValidate={onValidate}
            onSuccess={updateDetails}
            onCancel={routeFeedDetails(feed.trayId)}>
        {(submitting, validationErrors) => {
          return (
            <>
              <Input value={url}
                     onChange={({target}) => setUrl(target.value)}
                     autoComplete='url'
                     disabled={submitting}
                     error={firstError<Fields>('url', validationErrors)}>
                URL
              </Input>
              <Auth authType={authType as AuthTypes}
                    setAuthType={setAuthType}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    accessToken={accessToken}
                    setAccessToken={setAccessToken}
                    disabled={submitting}
                    authenticationOptions={EXTENDED_AUTH_TYPE_OPTIONS}/>
            </>
          )
        }}
      </Form>
    </Page>
  )
}
