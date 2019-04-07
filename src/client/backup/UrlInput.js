import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './snippet-id-input.scss'

export function UrlInput({url, setUrl, disabled}) {

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

UrlInput.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
