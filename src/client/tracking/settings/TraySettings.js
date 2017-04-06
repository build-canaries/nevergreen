import React, {Component, PropTypes} from 'react'
import Input from '../../common/forms/Input'
import nameGenerator from 'project-name-generator'
import _ from 'lodash'
import './tray-settings.scss'

class TraySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {newName: props.name, newUsername: props.username, newPassword: '', updatingPassword: false, credentialsChanged: false}
  }

  componentWillUnmount() {
    if (this.state.credentialsChanged) {
      this.props.refreshTray()
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
    const generateRandomName = () => this.setState({newName: _.lowerCase(nameGenerator().spaced)}, () => setName())
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

    return (
      <section className='tray-settings' data-locator='tray-settings'>
        <Input className='tray-settings-name' value={this.state.newName} onChange={nameChanged} onBlur={setName} onEnter={setName}
               placeholder='e.g. project or team name' data-locator='tray-name' autoFocus>
          <span>name</span>
        </Input>
        <button className='random' onClick={generateRandomName} data-locator='generate-random'>randomise</button>
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
              <button className='update' onClick={setPassword}>update</button>
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
  removeTray: PropTypes.func.isRequired,
  setTrayName: PropTypes.func.isRequired,
  setTrayUsername: PropTypes.func.isRequired,
  encryptPassword: PropTypes.func.isRequired,
  refreshTray: PropTypes.func.isRequired,
  pendingRequest: PropTypes.object
}

export default TraySettings
