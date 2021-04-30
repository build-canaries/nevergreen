import React, {ReactElement, useState} from 'react'
import styles from './import.scss'
import {DataSource, toConfiguration} from '../../../configuration/Configuration'
import {errorMessage, isBlank} from '../../../common/Utils'
import {useDispatch} from 'react-redux'
import {configurationImported} from '../BackupActionCreators'
import {isLeft, isRight} from 'fp-ts/Either'
import {TextArea} from '../TextArea'
import {ErrorMessages, MessagesType} from '../../../common/Messages'
import {Title} from '../../../common/Title'
import {BackupDescription} from '../BackupDescription'
import {Form} from '../../../common/forms/Form'
import {allErrors, FormErrors} from '../../../common/forms/Validation'
import {TimedMessage} from '../TimedMessage'
import {FileDropTarget} from './FileDropTarget'
import {ROUTE_SETTINGS_ANCHOR_BACKUP} from '../../../Routes'
import {InputFile} from './InputFile'
import {loadFile} from '../FileSystem'

const placeholder = 'Open, drag and drop or paste exported configuration here and press Import now'

export function ImportLocal(): ReactElement {
  const dispatch = useDispatch()
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
    }

    const result = toConfiguration(data, DataSource.UserImport)

    if (isLeft(result)) {
      result.left.forEach((message) => {
        validationMessage.push({field: 'import', message})
      })
    }

    return validationMessage
  }

  const doImport = () => {
    const result = toConfiguration(data, DataSource.UserImport)

    if (isRight(result)) {
      dispatch(configurationImported(result.right))
      return ROUTE_SETTINGS_ANCHOR_BACKUP
    }
  }

  return (
    <FileDropTarget onFileDropped={openFile}
                    className={styles.page}
                    disabled={!loaded}>
      <Title>Import local</Title>

      <div className={styles.header}>
        <BackupDescription/>
      </div>

      <div className={styles.body}>
        <ErrorMessages messages={loadErrors}
                       className={styles.message}/>
        <TimedMessage type={MessagesType.INFO}
                      clear={() => setSuccess('')}
                      messages={success}
                      className={styles.message}/>

        <InputFile onFileSelected={openFile}
                   disabled={!loaded}/>

        <Form onValidate={onValidate}
              onSuccess={doImport}
              submitButtonText='Import'
              clearErrors={!loaded}
              className={styles.form}>
          {(submitting, validationErrors) => {
            return (
              <TextArea label='Configuration to import'
                        errors={allErrors('import', validationErrors)}
                        placeholder={placeholder}
                        value={data}
                        onChange={({target}) => setData(target.value)}
                        disabled={submitting || !loaded}/>
            )
          }}
        </Form>
      </div>
    </FileDropTarget>
  )
}
