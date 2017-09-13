import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../../../common/forms/Input'
import styles from './github.scss'

class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state = {gistId: props.gistId}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({gistId: nextProps.gistId})
  }

  render() {
    const gistIdChanged = (evt) => this.setState({gistId: evt.target.value})
    const setGistId = () => this.props.gitHubSetGistId(this.state.gistId)
    const restore = () => this.props.restoreFromGitHub(this.state.gistId)
    const disabled = !this.props.loaded

    return (
      <div>
        <Input className={styles.gistId} value={this.state.gistId} onChange={gistIdChanged} onBlur={setGistId} disabled={disabled}>
          <span>gist ID</span>
        </Input>
        <button className={styles.restore} onClick={restore} disabled={disabled}>import</button>
      </div>
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
