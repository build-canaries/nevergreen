import React, {ReactElement, useEffect, useState} from 'react'
import {send} from '../../gateways/Gateway'
import {SecondaryButton} from '../../common/forms/Button'
import {useQuery} from 'react-query'
import {errorMessage} from '../../common/Utils'
import styles from './test-connection.scss'
import {AuthTypes, isBasicFeed, isTokenFeed, Tray} from '../../domain/Tray'
import {KeepExistingAuth, UpdateExistingAuthTypes} from './ConnectionForm'
import {testFeedConnection} from '../../gateways/ProjectsGateway'
import {Loop} from '../../common/icons/Loop'
import {TimedErrorMessages, TimedSuccessMessages} from '../../common/TimedMessages'

interface ConnectionDetails {
  readonly authType: UpdateExistingAuthTypes;
  readonly url: string;
  readonly accessToken: string;
  readonly password: string;
  readonly username: string;
}

interface TestConnectionProps {
  readonly existingFeed?: Tray;
  readonly details: ConnectionDetails;
}

export function TestConnection({existingFeed, details}: TestConnectionProps): ReactElement {
  const [showConnectionCheckMessages, setShowConnectionCheckMessages] = useState(true)

  const {isSuccess, refetch, isFetching, isError, error} = useQuery(['test-connection', details], async ({signal}) => {
    const keepingAuth = details.authType === KeepExistingAuth.keep
    const request = {
      authType: (keepingAuth ? existingFeed?.authType : details.authType) as AuthTypes,
      url: details.url,
      accessToken: keepingAuth ? undefined : details.accessToken,
      encryptedAccessToken: keepingAuth && isTokenFeed(existingFeed) ? existingFeed.encryptedAccessToken : undefined,
      password: keepingAuth ? undefined : details.password,
      encryptedPassword: keepingAuth && isBasicFeed(existingFeed) ? existingFeed.encryptedPassword : undefined,
      username: keepingAuth && isBasicFeed(existingFeed) ? existingFeed.username : details.username
    }
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
        <TimedSuccessMessages messages='Connected successfully' onDismiss={dismiss}/>
      )}
      {showConnectionCheckMessages && !isFetching && isError && (
        <TimedErrorMessages messages={[errorMessage(error)]} onDismiss={dismiss}/>
      )}
      <SecondaryButton className={styles.test}
                       onClick={() => refetch()}
                       disabled={isFetching}
                       icon={<Loop loaded={!isFetching}/>}>
        {isFetching ? 'Checking connection...' : 'Check connection'}
      </SecondaryButton>
    </>
  )
}
