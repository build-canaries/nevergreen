import type { Feed } from './FeedsReducer'
import { AuthTypes } from './FeedsReducer'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { SecondaryButton } from '../../common/forms/Button'
import { useQuery } from '@tanstack/react-query'
import { errorMessage } from '../../common/Utils'
import { KeepExistingAuth, UpdateExistingAuthTypes } from './ConnectionForm'
import {
  ConnectionDetailsRequest,
  testFeedConnection,
} from '../../gateways/ProjectsGateway'
import { Loop } from '../../common/icons/Loop'
import {
  TimedErrorMessages,
  TimedSuccessMessages,
} from '../../common/TimedMessages'
import styles from './test-connection.scss'

export interface Details {
  readonly authType: UpdateExistingAuthTypes
  readonly url: string
  readonly accessToken: string
  readonly password: string
  readonly username: string
  readonly queryKey: string
  readonly queryValue: string
}

interface TestConnectionProps {
  readonly existingFeed?: Feed
  readonly details: Details
}

export function TestConnection({
  existingFeed,
  details,
}: TestConnectionProps): ReactElement {
  const [showConnectionCheckMessages, setShowConnectionCheckMessages] =
    useState(true)

  const { isSuccess, refetch, isFetching, isError, error } = useQuery({
    queryKey: ['test-connection', details],
    queryFn: async ({ signal }) => {
      await testFeedConnection(createRequestData(details, existingFeed), signal)
      return true
    },
    enabled: false,
  })

  const dismiss = () => setShowConnectionCheckMessages(false)

  return (
    <>
      {showConnectionCheckMessages && !isFetching && isSuccess && (
        <TimedSuccessMessages
          messages="Connected successfully"
          onDismiss={dismiss}
        />
      )}
      {showConnectionCheckMessages && !isFetching && isError && (
        <TimedErrorMessages
          messages={[errorMessage(error)]}
          onDismiss={dismiss}
        />
      )}
      <SecondaryButton
        className={styles.test}
        onClick={() => {
          setShowConnectionCheckMessages(true)
          void refetch()
        }}
        disabled={isFetching}
        icon={<Loop isLoading={isFetching} />}
      >
        {isFetching ? 'Checking connection...' : 'Check connection'}
      </SecondaryButton>
    </>
  )
}

function createRequestData(
  details: Details,
  existingFeed?: Feed,
): ConnectionDetailsRequest {
  switch (details.authType) {
    case AuthTypes.basic:
      return basicRequest(details)
    case AuthTypes.token:
      return tokenRequest(details)
    case AuthTypes.queryParam:
      return queryParamRequest(details)
    case KeepExistingAuth.keep:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return keepRequest(details, existingFeed!)
    default:
      return noneRequest(details)
  }
}

function tokenRequest(details: Details): ConnectionDetailsRequest {
  return {
    authType: AuthTypes.token,
    url: details.url,
    accessToken: details.accessToken,
  }
}

function basicRequest(details: Details): ConnectionDetailsRequest {
  return {
    authType: AuthTypes.basic,
    url: details.url,
    username: details.username,
    password: details.password,
  }
}

function keepRequest(
  details: Details,
  existing: Feed,
): ConnectionDetailsRequest {
  return {
    authType: existing.authType,
    url: details.url,
    username: existing.username,
    encryptedAuth: existing.encryptedAuth,
  }
}

function queryParamRequest(details: Details): ConnectionDetailsRequest {
  return {
    authType: AuthTypes.queryParam,
    url: details.url,
    username: details.queryKey,
    password: details.queryValue,
  }
}

function noneRequest(details: Details): ConnectionDetailsRequest {
  return {
    authType: AuthTypes.none,
    url: details.url,
  }
}
