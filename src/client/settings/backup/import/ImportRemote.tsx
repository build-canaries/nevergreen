import React, {ReactElement, useState} from 'react'
import styles from './import.scss'
import {SecondaryButton} from '../../../common/forms/Button'
import {DataSource, toConfiguration} from '../../../configuration/Configuration'
import {errorMessage, isBlank} from '../../../common/Utils'
import {useDispatch, useSelector} from 'react-redux'
import {backupImported, configurationImported} from '../BackupActionCreators'
import {isLeft, isRight} from 'fp-ts/Either'
import {TextArea} from '../TextArea'
import {ErrorMessages} from '../../../common/Messages'
import {useParams} from 'react-router-dom'
import {getBackupLocation, RemoteLocation} from '../RemoteLocationsReducer'
import {send} from '../../../gateways/Gateway'
import {fetchConfiguration} from '../../../gateways/BackupGateway'
import {fromJson, toJson} from '../../../common/Json'
import {Form} from '../../../common/forms/Form'
import {allErrors, FormErrors} from '../../../common/forms/Validation'
import {ROUTE_SETTINGS_BACKUP} from '../../../Routes'
import {Loading} from '../../../common/Loading'
import {Redirect} from 'react-router'
import {Page} from '../../../common/Page'
import {Summary} from '../../../common/Summary'
import {backupSummary} from '../BackupSummary'
import {LinkButton} from '../../../common/LinkButton'
import {CloudDownload} from '../../../common/icons/CloudDownload'
import {Cross} from '../../../common/icons/Cross'
import {BackupLogo} from '../BackupLogo'
import {useQuery} from 'react-query'

type Fields = 'import'

interface ImportRemoteProps {
  readonly location: RemoteLocation;
}

export function ImportRemote(): ReactElement {
  const {internalId} = useParams<{ internalId: string }>()
  const location = useSelector(getBackupLocation(internalId))

  if (location) {
    return <ImportRemoteLocation location={location}/>
  } else {
    return <Redirect to={ROUTE_SETTINGS_BACKUP}/>
  }
}

function ImportRemoteLocation({location}: ImportRemoteProps): ReactElement {
  const dispatch = useDispatch()
  const [data, setData] = useState('')

  const {
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useQuery('import-remote', async ({signal}) => {
    const request = fetchConfiguration(location)
    signal?.addEventListener('abort', () => request.abort())
    const res = await send(request)
    return toJson(fromJson(res.configuration))
  }, {
    onSuccess: setData
  })

  const onValidate = (): FormErrors<Fields> | undefined => {
    if (isBlank(data)) {
      return [{field: 'import', message: 'Enter the configuration to import'}]

    } else {
      const result = toConfiguration(data, DataSource.UserImport)

      if (isLeft(result)) {
        return result.left.map((message) => {
          return {field: 'import', message}
        })
      }
    }
  }

  const doImport = () => {
    const result = toConfiguration(data, DataSource.UserImport)

    if (isRight(result)) {
      dispatch(configurationImported(result.right))
      dispatch(backupImported(location.internalId))
      return {successMessage: 'Configuration imported'}
    }
  }

  return (
    <Page title='Import remote' icon={<BackupLogo where={location.where}/>}>
      <Summary values={backupSummary(location)}/>
      <Loading loaded={!isFetching}
               className={styles.loading}>
        {isError && (
          <>
            <ErrorMessages messages={['Unable to fetch remote backup because of an error', errorMessage(error)]}/>
            <SecondaryButton className={styles.tryAgain}
                             icon={<CloudDownload/>}
                             onClick={() => refetch()}>
              Try fetching again
            </SecondaryButton>
            <LinkButton to={ROUTE_SETTINGS_BACKUP}
                        icon={<Cross/>}
                        className={styles.cancel}>
              Cancel
            </LinkButton>
          </>
        )}
        {isSuccess && (
          <Form onValidate={onValidate}
                onSuccess={doImport}
                onCancel={ROUTE_SETTINGS_BACKUP}
                submitButtonText='Import'>
            {(submitting, validationErrors) => {
              return (
                <TextArea label='Configuration to import'
                          errors={allErrors<Fields>('import', validationErrors)}
                          value={data}
                          onChange={({target}) => setData(target.value)}
                          disabled={submitting}/>
              )
            }}
          </Form>
        )}
      </Loading>
    </Page>
  )
}
