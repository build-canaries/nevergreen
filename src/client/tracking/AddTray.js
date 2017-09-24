import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../common/forms/Input'
import styles from './add-tray.scss'

class AddTray extends Component {
  constructor(props) {
    super(props)
    this.state = {url: '', username: '', password: ''}
  }

  addTray = () => {
    this.props.addTray(this.state.url, this.state.username, this.state.password, this.props.existingTrayIds)
    this.setState({url: '', username: '', password: ''})
  }

  updateUrl = (evt) => {
    this.setState({url: evt.target.value})
  }

  updateUsername = (evt) => {
    this.setState({username: evt.target.value})
  }

  updatePassword = (evt) => {
    this.setState({password: evt.target.value})
  }

  render() {

    return (
      <div className={styles.addTray}>
        <div className={styles.inputs}>
          <Input className={styles.trackingTrayUrl} placeholder='http(s)://host:port/cc.xml' value={this.state.url} onChange={this.updateUrl}
                 onEnter={this.addTray} data-locator='add-tray-url' autoFocus>
            <span>URL</span>
          </Input>
          <Input className={styles.username} value={this.state.username} onChange={this.updateUsername} onEnter={this.addTray}
                 data-locator='add-tray-username'>
            <span>username</span>
          </Input>
          <Input className={styles.password} value={this.state.password} onChange={this.updatePassword} onEnter={this.addTray}
                 data-locator='add-tray-password'>
            <span>password</span>
          </Input>
        </div>
        <button className={styles.add} onClick={this.addTray} data-locator='add-tray'>add</button>
      </div>
    )
  }
}

AddTray.propTypes = {
  existingTrayIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTray: PropTypes.func.isRequired
}

export default AddTray
