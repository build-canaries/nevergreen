import React, {Component, PropTypes} from 'react'
import PrimaryInput from '../common/PrimaryInput'
import './add-tray.scss'

class AddTray extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      username: '',
      password: ''
    }
  }

  render() {
    const addTray = () => {
      this.props.addTray(this.state.url, this.state.username, this.state.password)
      this.setState({
        url: '',
        username: '',
        password: ''
      })
    }
    const updateUrl = (evt) => this.setState({url: evt.target.value})
    const updateUsername = (evt) => this.setState({username: evt.target.value})
    const updatePassword = (evt) => this.setState({password: evt.target.value})
    const keyAddTray = (evt) => {
      if (evt.key === 'Enter') {
        addTray()
      }
    }

    return (
      <div className='add-tray'>
        <span className='url-input'>
          <label htmlFor='cctray-url'>url</label>
          <PrimaryInput>
            <input id='cctray-url' className='tracking-tray-url' type='text'
                   placeholder='e.g. http(s)://host:port/cc.xml' value={this.state.url} onChange={updateUrl}
                   onKeyPress={keyAddTray}/>
          </PrimaryInput>
        </span>
        <button id='cctray-fetch' className='button-primary' onClick={addTray}>add</button>
        <div>
            <span className='text-input'>
              <label htmlFor='username'>username</label>
              <input id='username' type='text' value={this.state.username} onChange={updateUsername}
                     onKeyPress={keyAddTray}/>
            </span>
          <span className='text-input'>
              <label htmlFor='password' className='text-label'>password</label>
              <input id='password' className='text-input' type='password' value={this.state.password}
                     onChange={updatePassword} onKeyPress={keyAddTray}/>
            </span>
        </div>
      </div>
    )
  }
}

AddTray.propTypes = {
  addTray: PropTypes.func.isRequired
}

export default AddTray
