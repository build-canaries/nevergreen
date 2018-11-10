import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './gist-id-input.scss'

export class GistIdInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newGistId: props.gistId
    }
  }

  gistIdChanged = (evt) => {
    this.setState({newGistId: evt.target.value})
  }

  setGistId = () => {
    this.props.setGistId(this.state.newGistId)
  }

  render() {
    const {newGistId} = this.state
    const {disabled} = this.props

    return (
      <Input className={styles.gistId}
             value={newGistId}
             onChange={this.gistIdChanged}
             onBlur={this.setGistId}
             disabled={disabled}>
        <div className={styles.label}>gist ID</div>
      </Input>
    )
  }
}

GistIdInput.propTypes = {
  gistId: PropTypes.string.isRequired,
  setGistId: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
