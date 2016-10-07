import React, {Component, PropTypes} from 'react'
import nameGenerator from 'project-name-generator'
import _ from 'lodash'
import './tray-settings.scss'

class TraySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordUpdated: false
    }
  }

  componentDidMount() {
    this.refs.name.focus()
  }

  render() {
    const generateRandomName = () => this.refs.name.value = _.startCase(nameGenerator().spaced)
    const updateTray = () => this.props.updateTray(this.props.trayId, this.refs.name.value, this.refs.url.value, this.refs.username.value, this.refs.password.value, this.state.passwordUpdated)
    const keyUpdate = (evt) => {
      if (evt.key === 'Enter') {
        updateTray()
      }
    }
    const passwordChanged = () => {
      this.setState({passwordUpdated: true})
    }

    return (
      <section className='tray-settings'>
        <div className='text-input'>
          <label htmlFor={`${this.props.trayId}-settings-name`}>name</label>
          <input className='tray-settings-name'
                 id={`${this.props.trayId}-settings-name`}
                 ref='name'
                 type='text'
                 defaultValue={this.props.name}
                 onKeyPress={keyUpdate}
                 placeholder='e.g. project or team name'/>
          <button className='generate-random' onClick={generateRandomName}>random</button>
        </div>
        <div className='text-input'>
          <label htmlFor={`${this.props.trayId}-settings-url`}>url</label>
          <input className='tray-settings-url'
                 id={`${this.props.trayId}-settings-url`}
                 ref='url'
                 type='text'
                 defaultValue={this.props.url}
                 onKeyPress={keyUpdate}
                 placeholder='this should not be blank...'/>
        </div>
        <div className='text-input'>
          <label htmlFor={`${this.props.trayId}-settings-username`}>username</label>
          <input id={`${this.props.trayId}-settings-username`}
                 ref='username'
                 type='text'
                 placeholder='not set'
                 defaultValue={this.props.username}
                 onKeyPress={keyUpdate}/>
        </div>
        <div className='text-input'>
          <label htmlFor={`${this.props.trayId}-settings-password`}>password</label>
          <input id={`${this.props.trayId}-settings-password`}
                 ref='password'
                 type='password'
                 placeholder='not set'
                 defaultValue={this.props.password}
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
            <button className='delete' onClick={() => this.props.removeTray(this.props.trayId)}>Delete this tray
            </button>
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
