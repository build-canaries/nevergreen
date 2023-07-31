import type { ReactElement } from 'react'
import { useState } from 'react'
import { DropDown } from '../../common/forms/DropDown'
import { createId, isBlank } from '../../common/Utils'
import {
  DEFAULT_GITHUB_URL,
  DEFAULT_GITLAB_URL,
  RemoteLocationOptions,
} from './RemoteLocationOptions'
import { Input } from '../../common/forms/Input'
import { Password } from '../../common/forms/Password'
import { encrypt } from '../../gateways/SecurityGateway'
import { isValidHttpUrl } from '../../domain/Url'
import { firstError, FormErrors } from '../../common/forms/Validation'
import { Form } from '../../common/forms/Form'
import { Page } from '../../common/Page'
import { BackupLogo } from './BackupLogo'
import { RoutePaths } from '../../AppRoutes'
import { useAppDispatch } from '../../configuration/Hooks'
import { addBackupLocation } from './RemoteLocationsActions'
import styles from './add-backup.scss'
import { generatePath } from 'react-router-dom'

type Fields = 'url' | 'accessToken'

export function AddBackupPage(): ReactElement {
  const dispatch = useAppDispatch()

  const [where, setWhere] = useState(RemoteLocationOptions.custom)
  const [url, setUrl] = useState('')
  const [externalId, setExternalId] = useState('')
  const [description, setDescription] = useState(
    'Nevergreen configuration backup',
  )
  const [accessToken, setAccessToken] = useState('')

  const onValidate = () => {
    const validationErrors: FormErrors<Fields> = []

    if (isBlank(url)) {
      validationErrors.push({ field: 'url', message: 'Enter a URL' })
    } else if (!isValidHttpUrl(url)) {
      validationErrors.push({
        field: 'url',
        message: 'Only http and https URLs are supported',
      })
    }

    if (
      where === RemoteLocationOptions.gitLab ||
      where === RemoteLocationOptions.gitHub
    ) {
      if (isBlank(accessToken)) {
        validationErrors.push({
          field: 'accessToken',
          message: 'Enter an access token',
        })
      }
    }

    return validationErrors
  }

  const onSuccess = async (signal: AbortSignal | undefined) => {
    const internalId = createId()
    if (
      where === RemoteLocationOptions.gitLab ||
      where === RemoteLocationOptions.gitHub
    ) {
      const encryptedAccessToken = await encrypt(accessToken, signal)
      dispatch(
        addBackupLocation({
          internalId,
          where,
          externalId,
          url,
          description,
          encryptedAccessToken,
        }),
      )
    } else {
      dispatch(
        addBackupLocation({
          where: RemoteLocationOptions.custom,
          internalId,
          url,
        }),
      )
    }
    return {
      navigateTo: generatePath(RoutePaths.backupExportDetails, { internalId }),
    }
  }

  const updateWhere = (updatedWhere: RemoteLocationOptions) => {
    if (updatedWhere === RemoteLocationOptions.custom) {
      setUrl('')
    } else if (updatedWhere === RemoteLocationOptions.gitHub) {
      setUrl(DEFAULT_GITHUB_URL)
    } else if (updatedWhere === RemoteLocationOptions.gitLab) {
      setUrl(DEFAULT_GITLAB_URL)
    }
    setWhere(updatedWhere)
  }

  const isCustomServer = where === RemoteLocationOptions.custom

  return (
    <Page title="Add remote location" icon={<BackupLogo where={where} />}>
      <Form
        onValidate={onValidate}
        onSuccess={onSuccess}
        submitButtonText="Add location"
        onCancel={RoutePaths.backup}
      >
        {(submitting, validationErrors, clearErrors) => {
          return (
            <>
              <DropDown
                className={styles.where}
                value={where}
                options={[
                  {
                    value: RemoteLocationOptions.custom,
                    display: 'Custom server',
                  },
                  {
                    value: RemoteLocationOptions.gitHub,
                    display: 'GitHub gist',
                  },
                  {
                    value: RemoteLocationOptions.gitLab,
                    display: 'GitLab snippet',
                  },
                ]}
                onChange={({ target }) => {
                  updateWhere(target.value as RemoteLocationOptions)
                  clearErrors()
                }}
                disabled={submitting}
              >
                Where
              </DropDown>
              <Input
                value={url}
                onChange={({ target }) => {
                  setUrl(target.value)
                }}
                type="url"
                autoComplete="url"
                error={firstError<Fields>('url', validationErrors)}
                disabled={submitting}
              >
                URL
              </Input>
              {!isCustomServer && (
                <>
                  <Input
                    classNameContainer={styles.id}
                    value={externalId}
                    onChange={({ target }) => {
                      setExternalId(target.value)
                    }}
                    disabled={submitting}
                  >
                    ID
                  </Input>
                  <Password
                    classNameContainer={styles.password}
                    value={accessToken}
                    onChange={({ target }) => {
                      setAccessToken(target.value)
                    }}
                    error={firstError<Fields>('accessToken', validationErrors)}
                    disabled={submitting}
                  >
                    Access token
                  </Password>
                  <Input
                    value={description}
                    onChange={({ target }) => {
                      setDescription(target.value)
                    }}
                    maxLength={256}
                    disabled={submitting}
                  >
                    Description
                  </Input>
                </>
              )}
            </>
          )
        }}
      </Form>
    </Page>
  )
}

export const Component = AddBackupPage
