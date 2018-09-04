import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Input from '../../common/forms/Input'
import DropDown from '../../common/forms/DropDown'
import {generateRandomName} from '../../domain/Tray'
import styles from './tray-settings.scss'
import VisuallyHidden from '../../common/VisuallyHidden'

const CI_OPTIONS = [
  {value: '', display: 'Auto detect'},
  {value: 'circle', display: 'CircleCI'},
  {value: 'cruise-control', display: 'CruiseControl'},
  {value: 'cruise-control-net', display: 'CruiseControl.net'},
  {value: 'cruise-control-rb', display: 'CruiseControl.rb'},
  {value: 'go', display: 'GoCD'},
  {value: 'hudson', display: 'Hudson'},
  {value: 'jenkins', display: 'Jenkins'},
  {value: 'solano', display: 'Solano CI'},
  {value: 'team-city', display: 'TeamCity'},
  {value: 'travis', display: 'Travis CI'}
]

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
    this.setState({
      updatingPassword: false,
      newPassword: '',
      credentialsChanged: true
    })
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

  render() {
    const existingPassword = this.props.password ? '*******' : ''
    const password = this.state.updatingPassword ? this.state.newPassword : existingPassword

    return (
      <section data-locator='tray-settings'>
        <VisuallyHidden><h3>Settings</h3></VisuallyHidden>
        <Input className={styles.traySettingsName}
               value={this.state.newName}
               onChange={this.nameChanged}
               onBlur={this.setName}
               onEnter={this.setName}
               placeholder='e.g. project or team name'
               data-locator='tray-name'
               autoFocus>
          <div className={styles.label}>name</div>
        </Input>
        <button className={styles.random}
                onClick={this.generateNewName}
                data-locator='generate-random'>
          randomise name
        </button>
        <Input value={this.state.newUrl}
               onChange={this.urlChanged}
               onBlur={this.setUrl}
               onEnter={this.setUrl}
               data-locator='tray-url'>
          <div className={styles.label}>URL</div>
        </Input>
        <DropDown className={styles.serverType}
                  options={CI_OPTIONS}
                  value={this.props.serverType}
                  onChange={this.serverTypeChange}
                  data-locator='tray-server-type'>
          <div className={styles.label}>server type</div>
        </DropDown>
        <Input className={styles.traySettingsUsername}
               value={this.state.newUsername}
               onChange={this.usernameChanged}
               onBlur={this.setUsername}
               onEnter={this.setUsername}
               data-locator='tray-username'>
          <div className={styles.label}>username</div>
        </Input>
        <Input type='password'
               className={styles.existingPassword}
               value={password}
               onChange={this.passwordChanged}
               onEnter={this.setPassword}
               readOnly={!this.state.updatingPassword}
               focus={this.state.updatingPassword}
               data-locator='tray-password'>
          <div className={styles.label}>password</div>
        </Input>
        {this.state.updatingPassword
          ? (
            <Fragment>
              <button className={styles.cancel}
                      onClick={this.cancel}
                      data-locator='change-password-cancel'>
                cancel
              </button>
              <button className={styles.update}
                      onClick={this.setPassword}
                      data-locator='change-password-update'>
                update password
              </button>
            </Fragment>
          ) : (
            <button className={styles.changePasswordButton}
                    onClick={this.changePassword}
                    data-locator='change-password'>
              change password
            </button>
          )
        }
        <div className={styles.dangerZone}>
          <h4 className={styles.dangerZoneTitle}>Danger Zone</h4>
          <div className={styles.dangerZoneContent}>
            <div className={styles.deleteInfo}>Once you delete, there is no going back. Please be certain.</div>
            <button className={styles.delete}
                    onClick={this.deleteTray}
                    data-locator='delete-tray'>
              delete
            </button>
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
