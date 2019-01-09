import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './snippet-id-input.scss'

export class GitLabUrlInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newUrl: props.url
    }
  }

  urlChanged = (evt) => {
    this.setState({newUrl: evt.target.value})
  }

  setUrl = () => {
    this.props.setUrl(this.state.newUrl)
  }

  render() {
    const {newUrl} = this.state
    const {disabled} = this.props

    return (
      <Input className={styles.srlId}
             value={newUrl}
             onChange={this.urlChanged}
             onBlur={this.setUrl}
             disabled={disabled}>
        <div className={styles.label}>url</div>
      </Input>
    )
  }
}

GitLabUrlInput.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
