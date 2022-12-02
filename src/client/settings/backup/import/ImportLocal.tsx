import React, {ReactElement, useState} from 'react'
import styles from './import.scss'
import {DataSource, toConfiguration} from '../../../configuration/Configuration'
import {errorMessage, isBlank} from '../../../common/Utils'
import {configurationImported} from '../BackupActionCreators'
import {isLeft, isRight} from 'fp-ts/Either'
import {TextArea} from '../TextArea'
import {Form} from '../../../common/forms/Form'
import {allErrors, FormErrors} from '../../../common/forms/Validation'
import {FileDropTarget} from './FileDropTarget'
import {InputFile} from './InputFile'
import {loadFile} from '../FileSystem'
import {Page} from '../../../common/Page'
import {FolderOpen} from '../../../common/icons/FolderOpen'
import {TimedErrorMessages, TimedInfoMessages} from '../../../common/TimedMessages'
import {useAppDispatch} from '../../../configuration/Hooks'

const placeholder = 'Open, drag and drop or paste exported configuration here and press Import'

export function ImportLocal(): ReactElement {
  const dispatch = useAppDispatch()
  const [success, setSuccessState] = useState('')
  const [loadErrors, setLoadErrors] = useState<ReadonlyArray<string>>([])
  const [data, setData] = useState('')
  const [loaded, setLoaded] = useState(true)

  const setSuccess = (message: string) => {
    setSuccessState(message)
    setLoadErrors([])
  }

  const setErrors = (messages: ReadonlyArray<string>) => {
    setSuccessState('')
    setLoadErrors(messages)
  }

  const openFile = async (files: FileList) => {
    setLoaded(false)

    if (files.length === 1) {
      try {
        const {content, filename} = await loadFile(files[0])
        setData(content)
        setSuccess(`Opened file "${filename}"`)
      } catch (e) {
        setErrors([errorMessage(e)])
      }
    } else {
      setErrors([`Only 1 backup file can be opened (attempted to open ${files.length} files)`])
    }

    setLoaded(true)
  }

  const onValidate = () => {
    const validationMessage: FormErrors<'import'> = []

    if (isBlank(data)) {
      validationMessage.push({field: 'import', message: 'Enter the configuration to import'})
    } else {
      const result = toConfiguration(data, DataSource.userImport)

      if (isLeft(result)) {
        result.left.forEach((message) => {
          validationMessage.push({field: 'import', message})
        })
      }
    }

    return validationMessage
  }

  const onSuccess = () => {
    const result = toConfiguration(data, DataSource.userImport)

    if (isRight(result)) {
      dispatch(configurationImported(result.right))
      setData('')
      return {successMessage: 'Configuration imported'}
    }
  }

  return (
    <Page title="Import local" icon={<FolderOpen/>}>
      <FileDropTarget onFileDropped={openFile}
                      disabled={!loaded}>
        <div className={styles.messages}>
          <TimedErrorMessages onDismiss={() => setLoadErrors([])}
                              messages={loadErrors}/>
          <TimedInfoMessages onDismiss={() => setSuccessState('')}
                             messages={success}/>
        </div>

        <InputFile onFileSelected={openFile}
                   disabled={!loaded}/>

        <Form onValidate={onValidate}
              onSuccess={onSuccess}
              onCancel="../backup"
              submitButtonText="Import"
              clearErrors={!loaded}
              className={styles.form}>
          {(submitting, validationErrors) => {
            return (
              <TextArea label="Configuration to import"
                        errors={allErrors('import', validationErrors)}
                        placeholder={placeholder}
                        value={data}
                        onChange={({target}) => setData(target.value)}
                        disabled={submitting || !loaded}/>
            )
          }}
        </Form>
      </FileDropTarget>
    </Page>
  )
}
