import React from 'react'
import styles from './locally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iPaste} from '../../../common/fonts/Icons'
import {useClipboard} from './ClipboardHook'

interface LocallyProps {
  configuration: string;
  exportSuccess: (messages: string[]) => void;
  exportError: (messages: string[]) => void;
}

export function Locally({configuration, exportSuccess, exportError}: LocallyProps) {

  const copySuccess = () => exportSuccess(['Successfully copied to clipboard'])
  const copyError = () => exportError(['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy'])

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
    </>
  )
}
