import React, {useState} from 'react'
import {Input} from '../common/forms/Input'
import styles from './url-input.scss'

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  disabled?: boolean;
}

export function UrlInput({url, setUrl, disabled}: UrlInputProps) {

  const [newUrl, setNewUrl] = useState(url)

  return (
    <Input value={newUrl}
           onChange={({target}) => setNewUrl(target.value)}
           onBlur={() => setUrl(newUrl)}
           disabled={disabled}
           className={styles.url}>
      <div className={styles.label}>URL</div>
    </Input>
  )
}
