import React, {ReactElement, useCallback, useEffect, useState} from 'react'
import styles from './import.scss'
import {SecondaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
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
import {fetchConfigurationNew, ImportResponse} from '../../../gateways/BackupGateway'
import {fromJson, toJson} from '../../../common/Json'
import {Title} from '../../../common/Title'
import {BackupDescription} from '../BackupDescription'
import {Form} from '../../../common/forms/Form'
import {allErrors, FormErrors} from '../../../common/forms/Validation'
import isEmpty from 'lodash/isEmpty'
import {ROUTE_SETTINGS_ANCHOR_BACKUP} from '../../../Routes'
import {Loading} from '../../../common/Loading'
import {Redirect} from 'react-router'

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
    return <Redirect to={ROUTE_SETTINGS_ANCHOR_BACKUP}/>
  }
}

function ImportRemoteLocation({location}: ImportRemoteProps): ReactElement {
  const dispatch = useDispatch()
  const [loadErrors, setLoadErrors] = useState<ReadonlyArray<string>>([])
  const [data, setData] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [fetchRequest, setFetchRequest] = useState<Request<ImportResponse>>()

  const createRequest = useCallback(() => setFetchRequest(fetchConfigurationNew(location)), [location])

  useEffect(createRequest, [createRequest])

  useEffect(() => {
    const fetchData = async () => {
      if (!fetchRequest) {
        return
      }

      setLoaded(false)
      setLoadErrors([])

      try {
        const res = await send(fetchRequest)
        setData(toJson(fromJson(res.configuration)))
      } catch (error) {
        setLoadErrors(['Unable to fetch remote backup because of an error', errorMessage(error)])
      }

      setFetchRequest(undefined)
      setLoaded(true)
    }

    void fetchData()

    return () => {
      fetchRequest?.abort()
    }
  }, [fetchRequest])

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
      if (location) {
        dispatch(backupImported(location.internalId))
      }
      return ROUTE_SETTINGS_ANCHOR_BACKUP
    }
  }

  const hasLoadErrors = !isEmpty(loadErrors)

  return (
    <div className={styles.page}>
      <Title>Import remote</Title>

      <div className={styles.header}>
        <BackupDescription location={location}/>
      </div>

      <div className={styles.body}>
        <Loading loaded={loaded}>
          <ErrorMessages messages={loadErrors}
                         className={styles.message}/>

          {hasLoadErrors && (
            <SecondaryButton className={styles.fetchButton}
                             icon={iCloudDownload}
                             onClick={createRequest}>
              Try fetching again
            </SecondaryButton>
          )}

          {!hasLoadErrors && (
            <Form onValidate={onValidate}
                  onSuccess={doImport}
                  submitButtonText='Import'>
              {(submitting, validationErrors) => {
                return (
                  <TextArea label='Configuration to import'
                            errors={allErrors<Fields>('import', validationErrors)}
                            value={data}
                            onChange={({target}) => setData(target.value)}
                            data-locator='import-data'
                            disabled={submitting}/>
                )
              }}
            </Form>
          )}
        </Loading>
      </div>
    </div>
  )
}
