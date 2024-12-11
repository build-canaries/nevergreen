import type { ReactElement } from 'react'
import { useState } from 'react'
import {
  DataSource,
  formatConfigurationErrorMessages,
  toConfiguration,
} from '../../../configuration/Configuration'
import { errorMessage, isBlank } from '../../../common/Utils'
import { configurationImported } from '../BackupActionCreators'
import { TextArea } from '../TextArea'
import { Form } from '../../../common/forms/Form'
import { allErrors, FormErrors } from '../../../common/forms/Validation'
import { FileDropTarget } from './FileDropTarget'
import { InputFile } from './InputFile'
import { loadFile } from '../FileSystem'
import { Page } from '../../../common/Page'
import { FolderOpen } from '../../../common/icons/FolderOpen'
import {
  TimedErrorMessages,
  TimedInfoMessages,
} from '../../../common/TimedMessages'
import { useAppDispatch } from '../../../configuration/Hooks'
import { RoutePaths } from '../../../AppRoutes'
import styles from './import-page.scss'

export function ImportLocalPage(): ReactElement {
  const dispatch = useAppDispatch()
  const [success, setSuccessState] = useState('')
  const [openFileError, setOpenFileError] = useState<string>('')
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setSuccess = (message: string) => {
    setSuccessState(message)
    setOpenFileError('')
  }

  const setError = (message: string) => {
    setSuccessState('')
    setOpenFileError(message)
  }

  const openFile = async (files: FileList) => {
    setIsLoading(true)

    if (files.length === 1) {
      try {
        const { content, filename } = await loadFile(files[0])
        setData(content)
        setSuccess(`Opened file "${filename}"`)
      } catch (e) {
        setError(errorMessage(e))
      }
    } else {
      setError(
        `Only 1 backup file can be opened (attempted to open ${files.length.toString()} files)`,
      )
    }

    setIsLoading(false)
  }

  const onValidate = () => {
    const validationMessage: FormErrors<'import'> = []

    if (isBlank(data)) {
      validationMessage.push({
        field: 'import',
        message: 'Enter the configuration to import',
      })
    } else {
      try {
        toConfiguration(data, DataSource.userImport)
      } catch (err) {
        formatConfigurationErrorMessages(err).forEach((message) => {
          validationMessage.push({ field: 'import', message })
        })
      }
    }

    return validationMessage
  }

  const onSuccess = () => {
    const configuration = toConfiguration(data, DataSource.userImport)
    dispatch(configurationImported(configuration))
    return { navigateTo: RoutePaths.backupImportSuccess }
  }

  return (
    <Page title="Import local" icon={<FolderOpen />}>
      <FileDropTarget onFileDropped={openFile} disabled={isLoading}>
        <div className={styles.messages}>
          <TimedErrorMessages
            onDismiss={() => {
              setOpenFileError('')
            }}
            messages={openFileError}
          />
          <TimedInfoMessages
            onDismiss={() => {
              setSuccessState('')
            }}
            messages={success}
          />
        </div>

        <InputFile onFileSelected={openFile} disabled={isLoading} />

        <Form
          onValidate={onValidate}
          onSuccess={onSuccess}
          onCancel={RoutePaths.backup}
          submitButtonText="Import"
          clearErrors={isLoading}
          className={styles.form}
        >
          {(submitting, validationErrors) => {
            return (
              <TextArea
                label="Configuration to import"
                errors={allErrors('import', validationErrors)}
                placeholder="Open, drag and drop or paste exported configuration here and press Import"
                value={data}
                onChange={({ target }) => {
                  setData(target.value)
                }}
                disabled={submitting || isLoading}
              />
            )
          }}
        </Form>
      </FileDropTarget>
    </Page>
  )
}

export const Component = ImportLocalPage
