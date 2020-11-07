import React, {ReactElement, useState} from 'react'
import styles from './import.scss'
import {PrimaryButton} from '../../common/forms/Button'
import {iFloppyDisk} from '../../common/fonts/Icons'
import {toConfiguration} from '../../configuration/Configuration'
import {isBlank} from '../../common/Utils'
import {useDispatch} from 'react-redux'
import {configurationImported} from '../BackupActionCreators'
import {isRight} from 'fp-ts/lib/Either'
import {TextArea} from './TextArea'
import {TimedMessage} from './TimedMessage'
import {MessagesType} from '../../common/Messages'

const PLACEHOLDER = 'paste exported configuration here and press import'

export function Import(): ReactElement {
  const dispatch = useDispatch()
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState<ReadonlyArray<string>>([])
  const [data, setData] = useState('')

  const doImport = () => {
    setErrors([])
    setSuccess('')

    if (isBlank(data)) {
      setErrors(['Please enter the configuration to import'])
    } else {
      const result = toConfiguration(data)
      if (isRight(result)) {
        setSuccess('Successfully imported configuration')
        dispatch(configurationImported(result.right))
        setData('')
      } else {
        setErrors(result.left)
      }
    }
  }

  return (
    <>
      <TextArea label='Configuration to import'
                error={errors}
                placeholder={PLACEHOLDER}
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
        Import
      </PrimaryButton>
    </>
  )
}
