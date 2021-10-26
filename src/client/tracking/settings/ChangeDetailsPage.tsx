import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {Page} from '../../common/Page'
import {authTypeDisplay, AuthTypes, CI_OPTIONS, generateRandomName, Tray} from '../../domain/Tray'
import {useDispatch, useSelector} from 'react-redux'
import {trayUpdated} from '../TrackingActionCreators'
import {ROUTE_SETTINGS_TRACKING, routeFeedProjects} from '../../Routes'
import {Form} from '../../common/forms/Form'
import {InputButton, SecondaryButton} from '../../common/forms/Button'
import {Input} from '../../common/forms/Input'
import styles from './change-details-page.scss'
import {DropDown} from '../../common/forms/DropDown'
import {Checkbox} from '../../common/forms/Checkbox'
import {firstError, FormErrors} from '../../common/forms/Validation'
import {isBlank} from '../../common/Utils'
import {isValidHttpUrl, removeScheme} from '../../domain/Url'
import {getTrays} from '../TraysReducer'
import {Request, send} from '../../gateways/Gateway'
import {encrypt, EncryptResponse} from '../../gateways/SecurityGateway'
import {Auth} from '../Auth'
import {Dice} from '../../common/icons/Dice'
import {Bin} from '../../common/icons/Bin'
import {Unlocked} from '../../common/icons/Unlocked'
import {Cog} from '../../common/icons/Cog'
import {Summary} from '../../common/Summary'

interface ChangeDetailsPageProps {
  readonly feed: Tray;
}

type Fields = 'url'

function urlMatches(feed: Tray, url: string): boolean {
  return removeScheme(url) === removeScheme(feed.url)
}

export function ChangeDetailsPage({feed}: ChangeDetailsPageProps): ReactElement {
  const dispatch = useDispatch()
  const otherFeeds = useSelector(getTrays).filter((existing: Tray) => existing.trayId !== feed.trayId)

  const [url, setUrl] = useState(feed.url)
  const [name, setName] = useState(feed.name || '')
  const [serverType, setServerType] = useState(feed.serverType)
  const [includeNew, setIncludeNew] = useState(feed.includeNew)
  const [changingAuth, setChangingAuth] = useState(false)
  const [authType, setAuthType] = useState(feed.authType)
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

  const toggleAuth = () => {
    if (changingAuth) {
      setChangingAuth(false)
      setAuthType(feed.authType)
      setUsername(feed.username || '')
      setPassword('')
      setAccessToken('')
    } else {
      setChangingAuth(true)
    }
  }

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
    if (changingAuth) {
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
    } else {
      return {}
    }
  }

  const updateDetails = async () => {
    const connectionChanged = url !== feed.url || changingAuth
    const authData = await authUpdates()
    dispatch(trayUpdated(feed.trayId, {
      url,
      name,
      serverType,
      includeNew,
      ...authData
    }))
    return connectionChanged
      ? routeFeedProjects(feed.trayId, true)
      : ROUTE_SETTINGS_TRACKING
  }

  return (
    <Page title='Change details' icon={<Cog/>}>
      <Form onValidate={onValidate}
            onSuccess={updateDetails}
            onCancel={ROUTE_SETTINGS_TRACKING}>
        {(submitting, validationErrors) => {
          const randomNameButton = (
            <InputButton icon={<Dice/>}
                         onClick={() => setName(generateRandomName())}
                         disabled={submitting}>
              randomise name
            </InputButton>
          )

          return (
            <>
              <Input value={url}
                     onChange={({target}) => setUrl(target.value)}
                     autoComplete='url'
                     disabled={submitting}
                     error={firstError<Fields>('url', validationErrors)}>
                URL
              </Input>
              <section className={styles.auth}>
                {!changingAuth && (
                  <Summary values={[{label: 'Authentication', value: authTypeDisplay(authType)}]}/>
                )}
                {changingAuth && (
                  <Auth authType={authType}
                        setAuthType={setAuthType}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        accessToken={accessToken}
                        setAccessToken={setAccessToken}
                        disabled={submitting}
                        readOnly={!changingAuth}/>
                )}
                <SecondaryButton className={styles.changeAuth}
                                 onClick={toggleAuth}
                                 icon={changingAuth ? <Bin/> : <Unlocked/>}>
                  {changingAuth ? 'Discard auth changes' : 'Change auth'}
                </SecondaryButton>
              </section>
              <Input className={styles.traySettingsName}
                     value={name}
                     onChange={({target}) => setName(target.value)}
                     placeholder='e.g. project or team name'
                     button={randomNameButton}
                     disabled={submitting}>
                Name
              </Input>
              <DropDown className={styles.serverType}
                        options={CI_OPTIONS}
                        value={serverType}
                        onChange={({target}) => setServerType(target.value)}
                        disabled={submitting}>
                Server type
              </DropDown>
              <Checkbox checked={includeNew}
                        onToggle={(newValue) => setIncludeNew(newValue)}
                        className={styles.includeNew}
                        disabled={submitting}>
                Automatically include new projects
              </Checkbox>
            </>
          )
        }}
      </Form>
    </Page>
  )
}
