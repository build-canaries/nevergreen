import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './id-input.scss'

export function IdInput({id, setId, disabled}) {
  const [newId, setNewId] = useState(id)

  return (
    <Input className={styles.input}
           value={newId}
           onChange={({target}) => setNewId(target.value)}
           onBlur={() => setId(newId)}
           disabled={disabled}>
      <div className={styles.label}>ID</div>
    </Input>
  )
}

IdInput.propTypes = {
  id: PropTypes.string.isRequired,
  setId: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
