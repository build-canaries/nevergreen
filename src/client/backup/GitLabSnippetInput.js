import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './snippet-id-input.scss'

export class GitLabSnippetInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newSnippetId: props.snippetId
    }
  }

  snippetIdChanged = (evt) => {
    this.setState({newSnippetId: evt.target.value})
  }

  setSnippetId = () => {
    this.props.setSnippetId(this.state.newSnippetId)
  }

  render() {
    const {newSnippetId} = this.state
    const {disabled} = this.props

    return (
      <Input className={styles.snippetId}
             value={newSnippetId}
             onChange={this.snippetIdChanged}
             onBlur={this.setSnippetId}
             disabled={disabled}>
        <div className={styles.label}>snippet ID</div>
      </Input>
    )
  }
}

GitLabSnippetInput.propTypes = {
  snippetId: PropTypes.string.isRequired,
  setSnippetId: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
