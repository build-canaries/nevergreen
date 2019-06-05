import React, {useState} from 'react'
import styles from './locally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iPaste} from '../../../common/fonts/Icons'
import {useClipboard} from './ClipboardHook'
import {Messages} from '../../../common/Messages'

interface LocallyProps {
  configuration: string;
}

export function Locally({configuration}: LocallyProps) {
  const [errors, setErrors] = useState<string[]>([])
  const [infos, setInfos] = useState<string[]>([])

  const copySuccess = () => {
    setErrors([])
    setInfos(['Successfully copied to clipboard'])
  }
  const copyError = () => {
    setInfos([])
    setErrors(['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy'])
  }

  useClipboard('#copy-to-clipboard', copySuccess, copyError)

  return (
    <>
      <label>
        <span className={styles.label}>current configuration</span>
        <textarea className={styles.data}
                  id='export-data'
                  value={configuration}
                  readOnly
                  spellCheck={false}
                  data-locator='export-data'/>
      </label>
      <PrimaryButton className={styles.copy}
                     id='copy-to-clipboard'
                     data-clipboard-target='#export-data'
                     icon={iPaste}>
        copy to clipboard
      </PrimaryButton>
      <Messages type='error' messages={errors}/>
      <Messages type='info' messages={infos}/>
    </>
  )
}
