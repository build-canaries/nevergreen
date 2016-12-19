import React, {Component, PropTypes} from 'react'
import Text from '../../common/forms/Text'
import nameGenerator from 'project-name-generator'
import _ from 'lodash'
import './tray-settings.scss'

class TraySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {newName: props.name, newUsername: props.username, newPassword: ''}
  }

  render() {
    const generateRandomName = () => this.setState({newName: _.startCase(nameGenerator().spaced)})
    const updateTray = () => this.props.updateTray(this.props.trayId, this.state.newName, this.props.url, this.state.newUsername, this.props.password, this.state.newPassword)
    const nameChanged = (evt) => this.setState({newName: evt.target.value})
    const usernameChanged = (evt) => this.setState({newUsername: evt.target.value})
    const passwordChanged = (evt) => this.setState({newPassword: evt.target.value})
    const passwordPlaceholder = this.props.password ? 'password encrypted' : 'not set'
    const deleteTray = () => this.props.removeTray(this.props.trayId)

    return (
      <section className='tray-settings' data-locator='tray-settings'>
        <div>
          <Text label='name' value={this.state.newName} onChange={nameChanged} onEnter={updateTray}
                placeholder='e.g. project or team name' data-locator='tray-name' isPrimary={true}/>
          <button className='generate-random' onClick={generateRandomName} data-locator='generate-random'>random
          </button>
        </div>
        <div className='row'>
          <Text label='username' placeholder='not set' value={this.state.newUsername} onChange={usernameChanged}
                onEnter={updateTray}/>
        </div>
        <div className='row'>
          <Text label='password' placeholder={passwordPlaceholder} value={this.state.newPassword}
                onChange={passwordChanged} onEnter={updateTray}/>
        </div>
        <button className='cancel' onClick={this.props.cancel}>cancel</button>
        <button className='update' onClick={updateTray} data-locator='update-tray'>update tray</button>
        <div className='danger-zone'>
          <h4 className='title'>
            <span className='icon-notification'/>
            <span className='text-with-icon'>Danger Zone</span>
          </h4>
          <div className='content'>
            <button className='delete' onClick={deleteTray}>Delete this tray</button>
            <span>Once you delete a tray, there is no going back. Please be certain.</span>
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
  updateTray: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default TraySettings
