import React, {Component, PropTypes} from 'react'
import Input from '../../common/forms/Input'
import ChangePassword from './ChangePassword'
import nameGenerator from 'project-name-generator'
import _ from 'lodash'
import './tray-settings.scss'

class TraySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {newName: props.name, newUsername: props.username, updatingPassword: false}
  }

  componentWillUnmount() {
    this.props.refreshTray()
  }

  render() {
    const nameChanged = (evt) => this.setState({newName: evt.target.value})
    const setName = () => this.props.setTrayName(this.props.trayId, this.state.newName)
    const generateRandomName = () => this.setState({newName: _.lowerCase(nameGenerator().spaced)}, () => setName())
    const usernameChanged = (evt) => this.setState({newUsername: evt.target.value})
    const setUsername = () => this.props.setTrayUsername(this.props.trayId, this.state.newUsername)
    const existingPassword = this.props.password ? 'encrypted' : ''
    const deleteTray = () => this.props.removeTray(this.props.trayId, this.props.pendingRequest)
    const cancel = () => this.setState({updatingPassword: false})
    const changePassword = () => this.setState({updatingPassword: true})
    const setPassword = (newPassword) => this.props.encryptPassword(this.props.trayId, newPassword, this.props.pendingRequest)

    return (
      <section className='tray-settings' data-locator='tray-settings'>
        <Input className='tray-settings-name' value={this.state.newName} onChange={nameChanged} onBlur={setName} onEnter={setName}
               placeholder='e.g. project or team name' data-locator='tray-name' autoFocus>
          <span>name</span>
        </Input>
        <button className='random' onClick={generateRandomName} data-locator='generate-random'>randomise</button>
        <Input className='tray-settings-username' value={this.state.newUsername} onChange={usernameChanged} onBlur={setUsername}
               onEnter={setUsername} placeholder='not set'>
          <span>username</span>
        </Input>
        {
          this.state.updatingPassword
            ? <ChangePassword trayId={this.props.trayId} back={cancel} setPassword={setPassword}/>
            : <span>
                  <Input className='existing-password' value={existingPassword} placeholder='not set' readOnly>
                    <span>password</span>
                  </Input>
                  <button className='change-password-button' onClick={changePassword}>change password</button>
                </span>
        }
        <div className='danger-zone'>
          <h4 className='danger-zone-title'>Danger Zone</h4>
          <div className='content'>
            <p>Once you delete a tray, there is no going back. Please be certain.</p>
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
