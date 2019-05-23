import React, {useState} from 'react'
import {Input} from '../common/forms/Input'
import styles from './id-input.scss'

interface IdInputProps {
  id: string;
  setId: (id: string) => void;
  disabled?: boolean;
}

export function IdInput({id, setId, disabled}: IdInputProps) {
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
