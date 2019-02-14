import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './snippet-id-input.scss'

export function GitLabUrlInput({url, setUrl, disabled}) {

  const [newUrl, setNewUrl] = useState(url)

  return (
    <Input value={newUrl}
           onChange={({target}) => setNewUrl(target.value)}
           onBlur={() => setUrl(newUrl)}
           disabled={disabled}>
      <div className={styles.label}>url</div>
    </Input>
  )
}

GitLabUrlInput.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
