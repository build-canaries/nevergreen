import React, {ReactElement, useState} from 'react'
import styles from './import.scss'
import {PrimaryButton} from '../../common/forms/Button'
import {iFloppyDisk} from '../../common/fonts/Icons'
import {DataSource, toConfiguration} from '../../configuration/Configuration'
import {isBlank} from '../../common/Utils'
import {useDispatch} from 'react-redux'
import {configurationImported} from '../BackupActionCreators'
import {isRight} from 'fp-ts/lib/Either'
import {TextArea} from './TextArea'
import {TimedMessage} from './TimedMessage'
import {MessagesType} from '../../common/Messages'
import * as logger from '../../common/Logger'
import {useStopDefaultDragAndDropBehaviour} from './StopDefaultDragAndDropBehaviourHook'

interface LoadedFile {
  readonly content: string;
  readonly filename: string;
}

const placeholder = 'Open, drag and drop or paste exported configuration here and press Import now'
const supportedFileTypes = ['application/json', 'text/plain']

function unsupportedMessage(file: File) {
  const supported = supportedFileTypes
    .map((s) => `"${s}"`)
    .join(' or ')
  return `Please open a backup file with type ${supported} ("${file.name}" has type "${file.type}")`
}

async function loadFile(file: File): Promise<LoadedFile> {
  return new Promise((resolve, reject) => {
    if (supportedFileTypes.some((supported) => supported === file.type)) {
      try {
        const fileReader = new FileReader()
        fileReader.onloadend = (result) => {
          resolve({
            content: result.target?.result as string,
            filename: file.name
          })
        }
        fileReader.readAsText(file)
      } catch (e) {
        logger.error('Unable to load file because of an error', e)
        reject('An error occurred while trying to open, please try again')
      }
    } else {
      reject(unsupportedMessage(file))
    }
  })
}

export function Import(): ReactElement {
  const dispatch = useDispatch()
  const [success, setSuccessState] = useState('')
  const [errors, setErrorsState] = useState<ReadonlyArray<string>>([])
  const [data, setData] = useState('')

  useStopDefaultDragAndDropBehaviour()

  const setSuccess = (message: string) => {
    setSuccessState(message)
    setErrorsState([])
  }

  const setErrors = (messages: ReadonlyArray<string>) => {
    setSuccessState('')
    setErrorsState(messages)
  }

  const doImport = () => {
    if (isBlank(data)) {
      setErrors(['Please enter the configuration to import'])
    } else {
      const result = toConfiguration(data, DataSource.UserImport)
      if (isRight(result)) {
        setSuccess('Successfully imported configuration')
        dispatch(configurationImported(result.right))
        setData('')
      } else {
        setErrors(result.left)
      }
    }
  }

  const openFile = async (files: FileList | null) => {
    if (!files) {
      return
    }

    if (files.length === 1) {
      try {
        const {content, filename} = await loadFile(files[0])
        setData(content)
        setSuccess(`Opened backup file "${filename}"`)
      } catch (e) {
        setErrors([e])
      }
    } else {
      setErrors([`Please open a single backup file (attempted to open ${files.length} files)`])
    }
  }

  return (
    <div onDragOver={(evt) => {
      evt.preventDefault()
      evt.dataTransfer.dropEffect = 'copy'
    }}
         onDrop={(evt) => {
           evt.preventDefault()
           void openFile(evt.dataTransfer.files)
         }}>
      <TextArea label='Configuration to import'
                error={errors}
                placeholder={placeholder}
                value={data}
                onChange={({target}) => {
                  setData(target.value)
                  setErrors([])
                }}
                data-locator='import-data'/>
      <TimedMessage type={MessagesType.INFO} clear={setSuccess} messages={success}/>
      <PrimaryButton className={styles.import}
                     onClick={doImport}
                     data-locator='import'
                     icon={iFloppyDisk}>
        Import now
      </PrimaryButton>
      <input className={styles.openFileInput}
             id='open-file'
             type='file'
             accept='.json,.txt,application/json,text/plain'
             multiple={false}
             onChange={(evt) => {
               void openFile(evt.target.files)
               evt.target.value = '' // allows the same file to be opened multiple times in a row
             }}/>
      <label className={styles.openFile} htmlFor='open-file'>Open backup...</label>
    </div>
  )
}
