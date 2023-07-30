import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import {
  DataSource,
  formatConfigurationErrorMessages,
  toConfiguration,
} from '../../../configuration/Configuration'
import type { FormErrors } from '../../../common/forms/Validation'
import { allErrors } from '../../../common/forms/Validation'
import type { RemoteLocation } from '../RemoteLocationsReducer'
import { SecondaryButton } from '../../../common/forms/Button'
import { errorMessage, isBlank } from '../../../common/Utils'
import { configurationImported } from '../BackupActionCreators'
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
import { RoutePaths } from '../../../AppRoutes'
import { useAppDispatch } from '../../../configuration/Hooks'
import styles from './import-page.scss'

type Fields = 'import'

function matchingLocation(
  searchIn: ReadonlyArray<RemoteLocation>,
  forLocation: RemoteLocation,
): RemoteLocation | undefined {
  return searchIn.find((location) => {
    return (
      location.where === forLocation.where &&
      location.url === forLocation.url &&
      location.externalId === forLocation.externalId
    )
  })
}

export function ImportRemotePage(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useAppDispatch()
  const [configToImport, setConfigToImport] = useState('')

  const { isFetching, isSuccess, isError, error, refetch, data } = useQuery(
    ['import-remote', location.internalId],
    async ({ signal }) => {
      const { configuration } = await fetchConfiguration(location, signal)
      return toJson(fromJson(configuration))
    },
  )

  useEffect(() => {
    if (data) {
      setConfigToImport(data)
    }
  }, [data])

  const onValidate = (): FormErrors<Fields> | undefined => {
    if (isBlank(configToImport)) {
      return [{ field: 'import', message: 'Enter the configuration to import' }]
    } else {
      try {
        toConfiguration(configToImport, DataSource.userImport)
      } catch (err) {
        return formatConfigurationErrorMessages(err).map((message) => {
          return { field: 'import', message }
        })
      }
    }
  }

  const doImport = () => {
    const configuration = toConfiguration(configToImport, DataSource.userImport)
    const searchIn = Object.values(configuration.backupRemoteLocations ?? {})
    const matching = matchingLocation(searchIn, location)
    dispatch(configurationImported(configuration, matching))
    return { navigateTo: RoutePaths.backupImportSuccess }
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
              to={RoutePaths.backup}
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
            onCancel={RoutePaths.backup}
            submitButtonText="Import"
          >
            {(submitting, validationErrors) => {
              return (
                <TextArea
                  label="Configuration to import"
                  errors={allErrors<Fields>('import', validationErrors)}
                  value={configToImport}
                  onChange={({ target }) => setConfigToImport(target.value)}
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

export const Component = ImportRemotePage
