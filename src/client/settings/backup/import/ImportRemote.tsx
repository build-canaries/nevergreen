import React, {ReactElement, useState} from 'react'
import styles from './import.scss'
import {SecondaryButton} from '../../../common/forms/Button'
import {DataSource, toConfiguration} from '../../../configuration/Configuration'
import {errorMessage, isBlank} from '../../../common/Utils'
import {useDispatch} from 'react-redux'
import {backupImported, configurationImported} from '../BackupActionCreators'
import {isLeft, isRight} from 'fp-ts/Either'
import {TextArea} from '../TextArea'
import {ErrorMessages} from '../../../common/Messages'
import {send} from '../../../gateways/Gateway'
import {fetchConfiguration} from '../../../gateways/BackupGateway'
import {fromJson, toJson} from '../../../common/Json'
import {Form} from '../../../common/forms/Form'
import {allErrors, FormErrors} from '../../../common/forms/Validation'
import {Loading} from '../../../common/Loading'
import {Page} from '../../../common/Page'
import {Summary} from '../../../common/Summary'
import {fullBackupSummary} from '../BackupSummary'
import {LinkButton} from '../../../common/LinkButton'
import {CloudDownload} from '../../../common/icons/CloudDownload'
import {Cross} from '../../../common/icons/Cross'
import {BackupLogo} from '../BackupLogo'
import {useQuery} from 'react-query'
import {useRemoteLocationContext} from '../RemoteLocationPage'
import {routeBackup} from '../../../AppRoutes'

type Fields = 'import'

export function ImportRemote(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useDispatch()
  const [data, setData] = useState('')

  const {
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useQuery('import-remote', async ({signal}) => {
    const res = await send(fetchConfiguration(location), signal)
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
      <Summary values={fullBackupSummary(location)}/>
      <Loading loaded={!isFetching}
               className={styles.loading}>
        {isError && (
          <>
            <ErrorMessages messages={['Unable to fetch remote backup because of an error', errorMessage(error)]}/>
            <SecondaryButton className={styles.tryAgain}
                             icon={<CloudDownload/>}
                             onClick={() => void refetch()}>
              Try fetching again
            </SecondaryButton>
            <LinkButton to={routeBackup}
                        icon={<Cross/>}
                        className={styles.cancel}>
              Cancel
            </LinkButton>
          </>
        )}
        {isSuccess && (
          <Form onValidate={onValidate}
                onSuccess={doImport}
                onCancel={routeBackup}
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
