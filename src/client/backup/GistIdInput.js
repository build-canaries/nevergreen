import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './gist-id-input.scss'

export function GistIdInput({gistId, setGistId, disabled}) {
  const [newGistId, setNewGistId] = useState(gistId)

  return (
    <Input className={styles.gistId}
           value={newGistId}
           onChange={({target}) => setNewGistId(target.value)}
           onBlur={() => setGistId(newGistId)}
           disabled={disabled}>
      <div className={styles.label}>gist ID</div>
    </Input>
  )
}

GistIdInput.propTypes = {
  gistId: PropTypes.string.isRequired,
  setGistId: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
