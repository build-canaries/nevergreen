import React, {Component, PropTypes} from 'react'
import Text from '../common/forms/Text'
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
        <Text label='url' className='tracking-tray-url' placeholder='e.g. http(s)://host:port/cc.xml'
              value={this.state.url} onChange={updateUrl} onEnter={addTray} data-locator='add-tray-url'
              isPrimary={true}/>
        <button className='button-primary' onClick={addTray} data-locator='add-tray'>add</button>
        <div className='authorisation'>
          <Text label='username' value={this.state.username} onChange={updateUsername} onEnter={addTray}
                data-locator='add-tray-username'/>
          <Text label='password' value={this.state.password} onChange={updatePassword} onEnter={addTray}
                data-locator='add-tray-password'/>
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
