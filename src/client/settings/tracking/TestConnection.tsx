import React, {ReactElement, useEffect, useState} from 'react'
import {send} from '../../gateways/Gateway'
import {SecondaryButton} from '../../common/forms/Button'
import {useQuery} from 'react-query'
import {errorMessage} from '../../common/Utils'
import styles from './test-connection.scss'
import {AuthTypes, Feed} from '../../domain/Feed'
import {KeepExistingAuth, UpdateExistingAuthTypes} from './ConnectionForm'
import {testFeedConnection} from '../../gateways/ProjectsGateway'
import {Loop} from '../../common/icons/Loop'
import {TimedErrorMessages, TimedSuccessMessages} from '../../common/TimedMessages'

interface Details {
  readonly authType: UpdateExistingAuthTypes;
  readonly url: string;
  readonly accessToken: string;
  readonly password: string;
  readonly username: string;
}

interface TestConnectionProps {
  readonly existingFeed?: Feed;
  readonly details: Details;
}

export function TestConnection({existingFeed, details}: TestConnectionProps): ReactElement {
  const [showConnectionCheckMessages, setShowConnectionCheckMessages] = useState(true)

  const {isSuccess, refetch, isFetching, isError, error} = useQuery(['test-connection', details], async ({signal}) => {
    const request = createRequest(details, existingFeed)
    return send(testFeedConnection(request), signal)
  }, {
    enabled: false
  })

  useEffect(() => {
    setShowConnectionCheckMessages(true)
  }, [isFetching])

  const dismiss = () => setShowConnectionCheckMessages(false)

  return (
    <>
      {showConnectionCheckMessages && !isFetching && isSuccess && (
        <TimedSuccessMessages messages="Connected successfully" onDismiss={dismiss}/>
      )}
      {showConnectionCheckMessages && !isFetching && isError && (
        <TimedErrorMessages messages={[errorMessage(error)]} onDismiss={dismiss}/>
      )}
      <SecondaryButton className={styles.test}
                       onClick={() => void refetch()}
                       disabled={isFetching}
                       icon={<Loop loaded={!isFetching}/>}>
        {isFetching ? 'Checking connection...' : 'Check connection'}
      </SecondaryButton>
    </>
  )
}

function createRequest(details: Details, existingFeed?: Feed) {
  switch (details.authType) {
    case AuthTypes.basic:
      return basicRequest(details)
    case AuthTypes.token:
      return tokenRequest(details)
    case KeepExistingAuth.keep:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return keepRequest(details, existingFeed!)
    default:
      return noneRequest(details)
  }
}

function tokenRequest(details: Details) {
  return {
    authType: AuthTypes.token,
    url: details.url,
    accessToken: details.accessToken
  }
}

function basicRequest(details: Details) {
  return {
    authType: AuthTypes.basic,
    url: details.url,
    username: details.username,
    password: details.password
  }
}

function keepRequest(details: Details, existing: Feed) {
  return {
    authType: existing.authType,
    url: details.url,
    username: existing.username,
    encryptedPassword: existing.encryptedPassword,
    encryptedAccessToken: existing.encryptedAccessToken
  }
}

function noneRequest(details: Details) {
  return {
    authType: AuthTypes.none,
    url: details.url
  }
}
