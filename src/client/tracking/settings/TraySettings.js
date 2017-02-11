import React, {Component, PropTypes} from 'react'
import Text from '../../common/forms/Text'
import Loading from '../../common/loading/Loading'
import nameGenerator from 'project-name-generator'
import _ from 'lodash'
import './tray-settings.scss'

class TraySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {newName: props.name, newUsername: props.username, newPassword: ''}
  }

  render() {
    const generateRandomName = () => this.setState({newName: _.lowerCase(nameGenerator().spaced)})
    const updateTray = () => this.props.updateTray(this.props.trayId, this.state.newName, this.props.url, this.state.newUsername, this.props.password, this.state.newPassword)
    const nameChanged = (evt) => this.setState({newName: evt.target.value})
    const usernameChanged = (evt) => this.setState({newUsername: evt.target.value})
    const passwordChanged = (evt) => this.setState({newPassword: evt.target.value})
    const passwordPlaceholder = this.props.password ? 'password encrypted' : 'not set'
    const deleteTray = () => this.props.removeTray(this.props.trayId, this.props.pendingRequest)

    return (
      <section className='tray-settings' data-locator='tray-settings'>
        <Loading loaded={this.props.loaded}>
          <Text label='name' className='tray-settings-name' value={this.state.newName} onChange={nameChanged} onEnter={updateTray}
                placeholder='e.g. project or team name' data-locator='tray-name' isPrimary={true}/>
          <button className='random' onClick={generateRandomName} data-locator='generate-random'>random</button>
          <Text label='username' className='tray-settings-username' placeholder='not set' value={this.state.newUsername} onChange={usernameChanged}
                onEnter={updateTray}/>
          <Text label='password' className='tray-settings-password' placeholder={passwordPlaceholder} value={this.state.newPassword}
                onChange={passwordChanged} onEnter={updateTray}/>
          <button className='cancel' onClick={this.props.cancel}>cancel</button>
          <button className='update' onClick={updateTray} data-locator='update-tray'>update tray</button>
        </Loading>
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
  loaded: PropTypes.bool,
  trayId: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  removeTray: PropTypes.func.isRequired,
  updateTray: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  pendingRequest: PropTypes.object
}

export default TraySettings
