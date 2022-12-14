import type { ReactElement } from 'react'
import React, { useState } from 'react'
import {
  DataSource,
  toConfiguration,
} from '../../../configuration/Configuration'
import type { FormErrors } from '../../../common/forms/Validation'
import { allErrors } from '../../../common/forms/Validation'
import styles from './import.scss'
import { SecondaryButton } from '../../../common/forms/Button'
import { errorMessage, isBlank } from '../../../common/Utils'
import { configurationImported } from '../BackupActionCreators'
import { isLeft, isRight } from 'fp-ts/Either'
import { TextArea } from '../TextArea'
import { ErrorMessages } from '../../../common/Messages'
import { fetchConfiguration } from '../../../gateways/BackupGateway'
import { fromJson, toJson } from '../../../common/Json'
import { Form } from '../../../common/forms/Form'
import { Loading } from '../../../common/Loading'
import { Page } from '../../../common/Page'
import { FullBackupSummary } from '../BackupSummary'
import { LinkButton } from '../../../common/LinkButton'
import { CloudDownload } from '../../../common/icons/CloudDownload'
import { Cross } from '../../../common/icons/Cross'
import { BackupLogo } from '../BackupLogo'
import { useQuery } from '@tanstack/react-query'
import { useRemoteLocationContext } from '../RemoteLocationPage'
import { ROUTE_BACKUP } from '../../../AppRoutes'
import { useAppDispatch } from '../../../configuration/Hooks'
import { backupImported } from '../RemoteLocationsActions'

type Fields = 'import'

export function ImportRemote(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useAppDispatch()
  const [data, setData] = useState('')

  const { isFetching, isSuccess, isError, error, refetch } = useQuery(
    ['import-remote'],
    async ({ signal }) => {
      const { configuration } = await fetchConfiguration(location, signal)
      return toJson(fromJson(configuration))
    },
    {
      onSuccess: setData,
    }
  )

  const onValidate = (): FormErrors<Fields> | undefined => {
    if (isBlank(data)) {
      return [{ field: 'import', message: 'Enter the configuration to import' }]
    } else {
      const result = toConfiguration(data, DataSource.userImport)

      if (isLeft(result)) {
        return result.left.map((message) => {
          return { field: 'import', message }
        })
      }
    }
  }

  const doImport = () => {
    const result = toConfiguration(data, DataSource.userImport)

    if (isRight(result)) {
      dispatch(configurationImported(result.right))
      dispatch(backupImported(location.internalId))
      return { successMessage: 'Configuration imported' }
    }
  }

  const title = 'Import remote'

  return (
    <Page
      title={title}
      icon={<BackupLogo where={location.where} />}
      focusTitle={false}
    >
      <FullBackupSummary location={location} />
      <Loading
        isLoading={isFetching}
        className={styles.loading}
        title={title}
        focus
      >
        {isError && (
          <>
            <ErrorMessages
              messages={[
                'Unable to fetch remote backup because of an error',
                errorMessage(error),
              ]}
            />
            <SecondaryButton
              className={styles.tryAgain}
              icon={<CloudDownload />}
              onClick={() => void refetch()}
            >
              Try fetching again
            </SecondaryButton>
            <LinkButton
              to={ROUTE_BACKUP}
              icon={<Cross />}
              className={styles.cancel}
            >
              Cancel
            </LinkButton>
          </>
        )}
        {isSuccess && (
          <Form
            onValidate={onValidate}
            onSuccess={doImport}
            onCancel={ROUTE_BACKUP}
            submitButtonText="Import"
          >
            {(submitting, validationErrors) => {
              return (
                <TextArea
                  label="Configuration to import"
                  errors={allErrors<Fields>('import', validationErrors)}
                  value={data}
                  onChange={({ target }) => setData(target.value)}
                  disabled={submitting}
                />
              )
            }}
          </Form>
        )}
      </Loading>
    </Page>
  )
}
