import React, {ReactElement, useState} from 'react'
import {AUTH_TYPE_OPTIONS, AuthTypes, Feed} from '../../domain/Feed'
import {useSelector} from 'react-redux'
import {Form} from '../../common/forms/Form'
import {Input} from '../../common/forms/Input'
import {firstError, FormErrors} from '../../common/forms/Validation'
import {isBlank} from '../../common/Utils'
import {isValidHttpUrl, removeScheme} from '../../domain/Url'
import {getFeeds} from './FeedsReducer'
import {send} from '../../gateways/Gateway'
import {encrypt} from '../../gateways/SecurityGateway'
import {DropDown} from '../../common/forms/DropDown'
import styles from './connection-form.scss'
import {Password} from '../../common/forms/Password'
import {TestConnection} from './TestConnection'

export enum KeepExistingAuth {
  keep = 'keep'
}

export type UpdateExistingAuthTypes = KeepExistingAuth | AuthTypes;

export interface ConnectionFormFields {
  readonly url: string;
  readonly authType: AuthTypes;
  readonly username: string;
  readonly encryptedPassword: string;
  readonly encryptedAccessToken: string;
}

interface ConnectionFormProps {
  readonly existingFeed?: Feed;
  readonly onSuccess: (details: ConnectionFormFields) => string;
  readonly onCancel: string;
}

type Fields = 'url'

function urlMatches(feed: Feed, url: string): boolean {
  return removeScheme(url) === removeScheme(feed.url)
}

const extendedAuthTypeOptions = [
  {value: KeepExistingAuth.keep, display: 'Keep existing auth'},
  ...AUTH_TYPE_OPTIONS
]

export function ConnectionForm({existingFeed, onSuccess, onCancel}: ConnectionFormProps): ReactElement {
  const otherFeeds = useSelector(getFeeds).filter((existing: Feed) => existing.trayId !== existingFeed?.trayId)
  const initialAuth = existingFeed ? KeepExistingAuth.keep : AuthTypes.none
  const authOptions = existingFeed ? extendedAuthTypeOptions : AUTH_TYPE_OPTIONS
  const submitButtonText = existingFeed ? 'Save' : 'Add feed'

  const [url, setUrl] = useState(existingFeed?.url || '')
  const [authType, setAuthType] = useState<UpdateExistingAuthTypes>(initialAuth)
  const [username, setUsername] = useState(existingFeed?.username || '')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const onValidate = () => {
    const validationErrors: FormErrors<Fields> = []

    if (isBlank(url)) {
      validationErrors.push({field: 'url', message: 'Enter a URL to the CCTray XML feed'})
    } else if (!isValidHttpUrl(url)) {
      validationErrors.push({field: 'url', message: 'Only http(s) URLs are supported'})
    }
    if (otherFeeds.find((other) => urlMatches(other, url))) {
      validationErrors.push({field: 'url', message: 'An existing CCTray XML feed already has this URL'})
    }

    return validationErrors
  }

  const newAuthType = (): AuthTypes => {
    switch (authType) {
      case KeepExistingAuth.keep:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return existingFeed!.authType
      default:
        return authType
    }
  }

  const newUsername = (): string => {
    switch (authType) {
      case AuthTypes.basic:
        return username
      case KeepExistingAuth.keep:
        return existingFeed?.username || ''
      default:
        return ''
    }
  }

  const newEncryptedPassword = async (signal: AbortSignal | undefined): Promise<string> => {
    switch (authType) {
      case AuthTypes.basic:
        return send(encrypt(password), signal)
      case KeepExistingAuth.keep:
        return existingFeed?.encryptedPassword || ''
      default:
        return ''
    }
  }

  const newEncryptedAccessToken = async (signal: AbortSignal | undefined): Promise<string> => {
    switch (authType) {
      case AuthTypes.token:
        return send(encrypt(accessToken), signal)
      case KeepExistingAuth.keep:
        return existingFeed?.encryptedAccessToken || ''
      default:
        return ''
    }
  }

  const processForm = async (signal: AbortSignal | undefined) => {
    return {
      navigateTo: onSuccess({
        url,
        authType: newAuthType(),
        username: newUsername(),
        encryptedPassword: await newEncryptedPassword(signal),
        encryptedAccessToken: await newEncryptedAccessToken(signal)
      })
    }
  }

  return (
    <Form onValidate={onValidate}
          onSuccess={processForm}
          onCancel={onCancel}
          submitButtonText={submitButtonText}>
      {(submitting, validationErrors) => {
        return (
          <>
            <Input value={url}
                   onChange={({target}) => setUrl(target.value)}
                   autoComplete="url"
                   disabled={submitting}
                   error={firstError<Fields>('url', validationErrors)}>
              URL
            </Input>
            <DropDown options={authOptions}
                      value={authType}
                      className={styles.authType}
                      onChange={({target}) => setAuthType(target.value as UpdateExistingAuthTypes)}>
              Authentication
            </DropDown>
            {authType == AuthTypes.basic && (
              <div className={styles.inputs}>
                <Input className={styles.username}
                       value={username}
                       onChange={({target}) => setUsername(target.value)}
                       disabled={submitting}
                       autoComplete="username">
                  Username
                </Input>
                <Password className={styles.password}
                          value={password}
                          onChange={({target}) => setPassword(target.value)}
                          disabled={submitting}
                          autoComplete="new-password">
                  Password
                </Password>
              </div>
            )}
            {authType == AuthTypes.token && (
              <div className={styles.inputs}>
                <Password className={styles.authToken}
                          value={accessToken}
                          onChange={({target}) => setAccessToken(target.value)}
                          disabled={submitting}
                          autoComplete="new-password">
                  Token
                </Password>
              </div>
            )}
            <TestConnection existingFeed={existingFeed}
                            details={{url, authType, username, password, accessToken}}/>
          </>
        )
      }}
    </Form>
  )
}
