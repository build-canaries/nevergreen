import React, {Component, PropTypes} from 'react'
import nameGenerator from 'project-name-generator'
import _ from 'lodash'
import './tray-settings.scss'

class TraySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newName: props.name,
      newUsername: props.username,
      newPassword: ''
    }
  }

  componentDidMount() {
    this.refs.name.focus()
  }

  render() {
    const generateRandomName = () => this.setState({newName: _.startCase(nameGenerator().spaced)})
    const updateTray = () => this.props.updateTray(this.props.trayId, this.state.newName, this.props.url, this.state.newUsername, this.props.password, this.state.newPassword)
    const keyUpdate = (evt) => {
      if (evt.key === 'Enter') {
        updateTray()
      }
    }
    const nameChanged = (evt) => this.setState({newName: evt.target.value})
    const usernameChanged = (evt) => this.setState({newUsername: evt.target.value})
    const passwordChanged = (evt) => this.setState({newPassword: evt.target.value})
    const passwordPlaceholder = this.props.password ? 'password encrypted' : 'not set'
    const deleteTray = () => this.props.removeTray(this.props.trayId)

    return (
      <section className='tray-settings'>
        <div className='text-input'>
          <label htmlFor={`${this.props.trayId}-settings-name`}>name</label>
          <input className='tray-settings-name'
                 id={`${this.props.trayId}-settings-name`}
                 ref='name'
                 type='text'
                 value={this.state.newName}
                 onChange={nameChanged}
                 onKeyPress={keyUpdate}
                 placeholder='e.g. project or team name'/>
          <button className='generate-random' onClick={generateRandomName}>random</button>
        </div>
        <div className='text-input'>
          <label htmlFor={`${this.props.trayId}-settings-username`}>username</label>
          <input id={`${this.props.trayId}-settings-username`}
                 type='text'
                 placeholder='not set'
                 value={this.state.newUsername}
                 onChange={usernameChanged}
                 onKeyPress={keyUpdate}/>
        </div>
        <div className='text-input'>
          <label htmlFor={`${this.props.trayId}-settings-password`}>password</label>
          <input id={`${this.props.trayId}-settings-password`}
                 type='password'
                 placeholder={passwordPlaceholder}
                 value={this.state.newPassword}
                 onChange={passwordChanged}
                 onKeyPress={keyUpdate}/>
        </div>
        <button className='cancel' onClick={this.props.cancel}>cancel</button>
        <button className='update' onClick={updateTray}>update tray</button>

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
