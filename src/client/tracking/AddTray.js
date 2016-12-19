import React, {Component, PropTypes} from 'react'
import './add-tray.scss'

class AddTray extends Component {
  constructor(props) {
    super(props)
    this.state = {url: '', username: '', password: ''}
  }

  componentDidMount() {
    this.primaryInput.focus()
  }

  render() {
    const addTray = () => {
      this.props.addTray(this.state.url, this.state.username, this.state.password, this.props.existingTrays)
      this.setState({url: '', username: '', password: ''})
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
          <input id='cctray-url' className='tracking-tray-url' type='text'
                 placeholder='e.g. http(s)://host:port/cc.xml' value={this.state.url} onChange={updateUrl}
                 onKeyPress={keyAddTray} data-locator='add-tray-url' ref={(node) => this.primaryInput = node}/>
        </span>
        <button className='button-primary' onClick={addTray} data-locator='add-tray'>add</button>
        <div>
            <span className='text-input'>
              <label htmlFor='username'>username</label>
              <input id='username' type='text' value={this.state.username} onChange={updateUsername}
                     onKeyPress={keyAddTray} data-locator='add-tray-username'/>
            </span>
          <span className='text-input'>
              <label htmlFor='password' className='text-label'>password</label>
              <input id='password' className='text-input' type='password' value={this.state.password}
                     onChange={updatePassword} onKeyPress={keyAddTray} data-locator='add-tray-password'/>
            </span>
        </div>
      </div>
    )
  }
}

AddTray.propTypes = {
  existingTrays: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTray: PropTypes.func.isRequired
}

export default AddTray
