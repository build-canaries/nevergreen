import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Input from '../../../common/forms/Input'
import styles from './github.scss'

class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state = {gistId: props.gistId}
  }

  gistIdChanged = (evt) => {
    this.setState({gistId: evt.target.value})
  }

  setGistId = () => {
    this.props.gitHubSetGistId(this.state.gistId)
  }

  restore = () => {
    this.props.restoreFromGitHub(this.state.gistId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({gistId: nextProps.gistId})
  }

  render() {
    const disabled = !this.props.loaded

    return (
      <Fragment>
        <Input className={styles.gistId} value={this.state.gistId} onChange={this.gistIdChanged} onBlur={this.setGistId}
               disabled={disabled}>gist ID</Input>
        <button className={styles.restore} onClick={this.restore} disabled={disabled}>import</button>
      </Fragment>
    )
  }
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  restoreFromGitHub: PropTypes.func.isRequired,
  gitHubSetGistId: PropTypes.func.isRequired,
  gistId: PropTypes.string.isRequired
}

export default GitHub
