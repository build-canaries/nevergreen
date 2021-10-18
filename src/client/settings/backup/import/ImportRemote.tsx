import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react'
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
import {Request, send} from '../../../gateways/Gateway'
import {fetchConfiguration, ImportResponse} from '../../../gateways/BackupGateway'
import {fromJson, toJson} from '../../../common/Json'
import {Form} from '../../../common/forms/Form'
import {allErrors, FormErrors} from '../../../common/forms/Validation'
import isEmpty from 'lodash/isEmpty'
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
  const [loadErrors, setLoadErrors] = useState<ReadonlyArray<string>>([])
  const [data, setData] = useState('')
  const [loaded, setLoaded] = useState(false)
  const fetchRequest = useRef<Request<ImportResponse>>()

  const fetchData = useCallback(async () => {
    setLoaded(false)
    setLoadErrors([])

    try {
      fetchRequest.current = fetchConfiguration(location)
      const res = await send(fetchRequest.current)
      setData(toJson(fromJson(res.configuration)))
    } catch (error) {
      setLoadErrors(['Unable to fetch remote backup because of an error', errorMessage(error)])
    }

    fetchRequest.current = undefined
    setLoaded(true)
  }, [location])

  useEffect(() => {
    void fetchData()
    return () => {
      fetchRequest.current?.abort()
    }
  }, [fetchData])

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
      return ROUTE_SETTINGS_BACKUP
    }
  }

  const hasLoadErrors = !isEmpty(loadErrors)

  return (
    <Page title='Import remote' icon={<BackupLogo where={location.where}/>}>
      <Summary values={backupSummary(location)}/>
      <Loading loaded={loaded}
               className={styles.loading}>
        <ErrorMessages messages={loadErrors}/>

        {hasLoadErrors && (
          <>
            <SecondaryButton className={styles.tryAgain}
                             icon={<CloudDownload/>}
                             onClick={fetchData}>
              Try fetching again
            </SecondaryButton>
            <LinkButton to={ROUTE_SETTINGS_BACKUP}
                        icon={<Cross/>}
                        className={styles.cancel}>
              Cancel
            </LinkButton>
          </>
        )}

        {!hasLoadErrors && (
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
