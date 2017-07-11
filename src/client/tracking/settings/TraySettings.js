import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../../common/forms/Input'
import DropDown from '../../common/forms/DropDown'
import {generateRandomName} from '../../common/project/Name'
import './tray-settings.scss'

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
    const nameChanged = (evt) => this.setState({newName: evt.target.value})
    const setName = () => this.props.setTrayName(this.props.trayId, this.state.newName)
    const generateNewName = () => this.setState({newName: generateRandomName()}, () => setName())
    const serverTypeChange = (evt) => this.props.setServerType(this.props.trayId, evt.target.value)
    const usernameChanged = (evt) => this.setState({newUsername: evt.target.value})
    const setUsername = () => {
      this.setState({credentialsChanged: this.props.username !== this.state.newUsername})
      this.props.setTrayUsername(this.props.trayId, this.state.newUsername)
    }
    const passwordChanged = (evt) => this.setState({newPassword: evt.target.value})
    const existingPassword = this.props.password ? '*******' : ''
    const password = this.state.updatingPassword ? this.state.newPassword : existingPassword
    const deleteTray = () => this.props.removeTray(this.props.trayId, this.props.pendingRequest)
    const cancel = () => this.setState({updatingPassword: false})
    const changePassword = () => this.setState({updatingPassword: true})
    const setPassword = () => {
      this.props.encryptPassword(this.props.trayId, this.state.newPassword, this.props.pendingRequest)
      this.setState({updatingPassword: false, newPassword: '', credentialsChanged: true})
    }
    const urlChanged = (evt) => this.setState({newUrl: evt.target.value})
    const setUrl = () => {
      this.setState({urlChanged: this.props.url !== this.state.newUrl})
      this.props.setTrayUrl(this.props.trayId, this.state.newUrl)
    }

    return (
      <section className='tray-settings' data-locator='tray-settings'>
        <Input className='tray-settings-name' value={this.state.newName} onChange={nameChanged} onBlur={setName} onEnter={setName}
               placeholder='e.g. project or team name' data-locator='tray-name' autoFocus>
          <span>name</span>
        </Input>
        <button className='random' onClick={generateNewName} data-locator='generate-random'>randomise</button>
        <Input className='tray-settings-url' value={this.state.newUrl} onChange={urlChanged} onBlur={setUrl} onEnter={setUrl}>
          <span>URL</span>
        </Input>
        <DropDown className='server-type' title='server type' value={this.props.serverType} onChange={serverTypeChange}>
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
        <Input className='tray-settings-username' value={this.state.newUsername} onChange={usernameChanged} onBlur={setUsername}
               onEnter={setUsername}>
          <span>username</span>
        </Input>
        <Input className='existing-password' value={password} onChange={passwordChanged} onEnter={setPassword}
               readOnly={!this.state.updatingPassword} ref={(node) => this.passwordInput = node}>
          <span>password</span>
        </Input>
        {this.state.updatingPassword
          ? <span>
              <button className='cancel' onClick={cancel}>cancel</button>
              <button className='update' onClick={setPassword}>update password</button>
            </span>
          : <button className='change-password-button' onClick={changePassword}>change password</button>
        }
        <div className='danger-zone'>
          <h4 className='danger-zone-title'>Danger Zone</h4>
          <div className='content'>
            <span>Once you delete a tray, there is no going back. Please be certain.</span>
            <button className='delete' onClick={deleteTray}>delete this tray</button>
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
