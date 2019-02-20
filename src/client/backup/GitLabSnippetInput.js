import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './snippet-id-input.scss'

export function GitLabSnippetInput({snippetId, setSnippetId, disabled}) {
  const [newSnippetId, setNewSnippetId] = useState(snippetId)

  return (
    <Input value={newSnippetId}
           onChange={({target}) => setNewSnippetId(target.value)}
           onBlur={() => setSnippetId(newSnippetId)}
           disabled={disabled}
           className={styles.snippet}>
      <div className={styles.label}>snippet ID</div>
    </Input>
  )
}

GitLabSnippetInput.propTypes = {
  snippetId: PropTypes.string.isRequired,
  setSnippetId: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
