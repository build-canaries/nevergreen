import React, {ChangeEvent, ReactElement} from 'react'
import cn from 'classnames'
import isNil from 'lodash/isNil'
import styles from './input-file.scss'
import {FolderOpen} from '../../../common/icons/FolderOpen'

interface InputFileProps {
  readonly onFileSelected: (files: FileList) => Promise<void>;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function InputFile({onFileSelected, disabled, className}: InputFileProps): ReactElement {
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files
    if (!isNil(files)) {
      void onFileSelected(files)
    }
    evt.target.value = '' // allows the same file to be opened multiple times in a row
  }

  return (
    <>
      <input className={styles.openFileInput}
             id='open-file'
             type='file'
             accept='.json,.txt,application/json,text/plain'
             multiple={false}
             onChange={onChange}
             disabled={disabled}/>
      <label className={cn(styles.openFile, className)} htmlFor='open-file'>
        <FolderOpen/>
        Open local...
      </label>
    </>
  )
}
