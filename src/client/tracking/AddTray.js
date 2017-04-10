import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../common/forms/Input'
import './add-tray.scss'

class AddTray extends Component {
  constructor(props) {
    super(props)
    this.state = {url: '', username: '', password: ''}
  }

  render() {
    const addTray = () => {
      this.props.addTray(this.state.url, this.state.username, this.state.password, this.props.existingTrays)
      this.setState({url: '', username: '', password: ''})
    }
    const updateUrl = (evt) => this.setState({url: evt.target.value})
    const updateUsername = (evt) => this.setState({username: evt.target.value})
    const updatePassword = (evt) => this.setState({password: evt.target.value})

    return (
      <div className='add-tray'>
        <div className='inputs'>
          <Input type='url' className='tracking-tray-url' placeholder='http(s)://host:port/cc.xml' value={this.state.url}
                 onChange={updateUrl} onEnter={addTray} data-locator='add-tray-url' autoFocus>
            <span>URL</span>
          </Input>
          <Input className='username' value={this.state.username} onChange={updateUsername} onEnter={addTray} data-locator='add-tray-username'>
            <span>username</span>
          </Input>
          <Input className='password' value={this.state.password} onChange={updatePassword} onEnter={addTray} data-locator='add-tray-password'>
            <span>password</span>
          </Input>
        </div>
        <button className='add' onClick={addTray} data-locator='add-tray'>add</button>
      </div>
    )
  }
}

AddTray.propTypes = {
  existingTrays: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTray: PropTypes.func.isRequired
}

export default AddTray
