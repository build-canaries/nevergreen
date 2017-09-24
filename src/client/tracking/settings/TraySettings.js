import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../../common/forms/Input'
import DropDown from '../../common/forms/DropDown'
import {generateRandomName} from '../../common/project/Name'
import styles from './tray-settings.scss'

class TraySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newName: props.name,
      newUsername: props.username,
      newPassword: '',
      updatingPassword: false,
      credentialsChanged: false,
      urlChanged: false,
      newUrl: props.url
    }
  }

  nameChanged = (evt) => {
    this.setState({newName: evt.target.value})
  }

  setName = () => {
    this.props.setTrayName(this.props.trayId, this.state.newName)
  }

  generateNewName = () => {
    this.setState({newName: generateRandomName()}, () => this.setName())
  }

  serverTypeChange = (evt) => {
    this.props.setServerType(this.props.trayId, evt.target.value)
  }

  usernameChanged = (evt) => {
    this.setState({newUsername: evt.target.value})
  }

  setUsername = () => {
    this.setState({credentialsChanged: this.props.username !== this.state.newUsername})
    this.props.setTrayUsername(this.props.trayId, this.state.newUsername)
  }

  passwordChanged = (evt) => {
    this.setState({newPassword: evt.target.value})
  }

  deleteTray = () => {
    this.props.removeTray(this.props.trayId, this.props.pendingRequest)
  }

  cancel = () => {
    this.setState({updatingPassword: false})
  }

  changePassword = () => {
    this.setState({updatingPassword: true})
  }

  setPassword = () => {
    this.props.encryptPassword(this.props.trayId, this.state.newPassword, this.props.pendingRequest)
    this.setState({updatingPassword: false, newPassword: '', credentialsChanged: true})
  }

  urlChanged = (evt) => {
    this.setState({newUrl: evt.target.value})
  }

  setUrl = () => {
    this.setState({urlChanged: this.props.url !== this.state.newUrl})
    this.props.setTrayUrl(this.props.trayId, this.state.newUrl)
  }

  componentWillUnmount() {
    if (this.state.urlChanged) {
      this.props.updateTrayId(this.props, this.state.newUrl, this.props.pendingRequest)
    }
    if (this.state.credentialsChanged) {
      this.props.refreshTray(this.props, this.props.pendingRequest)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.updatingPassword && this.state.updatingPassword) {
      this.passwordInput.focus()
    }
  }

  render() {
    const existingPassword = this.props.password ? '*******' : ''
    const password = this.state.updatingPassword ? this.state.newPassword : existingPassword

    return (
      <section data-locator='tray-settings'>
        <Input className={styles.traySettingsName} value={this.state.newName} onChange={this.nameChanged} onBlur={this.setName} onEnter={this.setName}
               placeholder='e.g. project or team name' data-locator='tray-name' autoFocus>
          <span>name</span>
        </Input>
        <button className={styles.random} onClick={this.generateNewName} data-locator='generate-random'>randomise</button>
        <Input className={styles.traySettingsUrl} value={this.state.newUrl} onChange={this.urlChanged} onBlur={this.setUrl} onEnter={this.setUrl}>
          <span>URL</span>
        </Input>
        <DropDown className={styles.serverType} title='server type' value={this.props.serverType} onChange={this.serverTypeChange}>
          <option value=''>Auto detect</option>
          <option value='circle'>CircleCI</option>
          <option value='cruise-control'>CruiseControl</option>
          <option value='cruise-control-net'>CruiseControl.net</option>
          <option value='cruise-control-rb'>CruiseControl.rb</option>
          <option value='go'>GoCD</option>
          <option value='hudson'>Hudson</option>
          <option value='jenkins'>Jenkins</option>
          <option value='snap'>Snap CI</option>
          <option value='solano'>Solano CI</option>
          <option value='team-city'>TeamCity</option>
          <option value='travis'>Travis CI</option>
        </DropDown>
        <Input className={styles.traySettingsUsername} value={this.state.newUsername} onChange={this.usernameChanged} onBlur={this.setUsername}
               onEnter={this.setUsername}>
          <span>username</span>
        </Input>
        <Input className={styles.existingPassword} value={password} onChange={this.passwordChanged} onEnter={this.setPassword}
               readOnly={!this.state.updatingPassword} ref={(node) => this.passwordInput = node}>
          <span>password</span>
        </Input>
        {this.state.updatingPassword
          ? <span>
              <button className={styles.cancel} onClick={this.cancel}>cancel</button>
              <button className={styles.update} onClick={this.setPassword}>update password</button>
            </span>
          : <button className={styles.changePasswordButton} onClick={this.changePassword}>change password</button>
        }
        <div className={styles.dangerZone}>
          <h4 className={styles.dangerZoneTitle}>Danger Zone</h4>
          <div className={styles.dangerZoneContent}>
            <span>Once you delete, there is no going back. Please be certain.</span>
            <button className={styles.delete} onClick={this.deleteTray}>delete</button>
          </div>
        </div>
      </section>
    )
  }
}

TraySettings.propTypes = {
  trayId: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  serverType: PropTypes.string,
  removeTray: PropTypes.func.isRequired,
  setTrayName: PropTypes.func.isRequired,
  setServerType: PropTypes.func.isRequired,
  setTrayUsername: PropTypes.func.isRequired,
  setTrayUrl: PropTypes.func.isRequired,
  updateTrayId: PropTypes.func.isRequired,
  encryptPassword: PropTypes.func.isRequired,
  refreshTray: PropTypes.func.isRequired,
  pendingRequest: PropTypes.object
}

export default TraySettings
