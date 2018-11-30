import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './add-tray.scss'

const DEFAULT_STATE = {
  url: '',
  username: '',
  password: ''
}

export class AddTray extends Component {

  constructor(props) {
    super(props)
    this.state = {...DEFAULT_STATE}
  }

  addTray = () => {
    this.props.addTray(this.state.url, this.state.username, this.state.password)
    this.setState({...DEFAULT_STATE})
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
    const {url, username, password} = this.state

    return (
      <div className={styles.addTray}>
        <div className={styles.inputs}>
          <Input className={styles.url}
                 placeholder='CCTray XML file e.g. https://my-jenkins-host/cc.xml'
                 value={url}
                 onChange={this.updateUrl}
                 onEnter={this.addTray}
                 data-locator='add-tray-url'
                 autoComplete='url'>
            <div className={styles.label}>URL</div>
          </Input>
          <Input className={styles.username}
                 value={username}
                 onChange={this.updateUsername}
                 onEnter={this.addTray}
                 data-locator='add-tray-username'
                 autoComplete='username'>
            <div className={styles.label}>username</div>
          </Input>
          <Input type='password'
                 className={styles.password}
                 value={password}
                 onChange={this.updatePassword}
                 onEnter={this.addTray}
                 data-locator='add-tray-password'
                 autoComplete='new-password'>
            <div className={styles.label}>password</div>
          </Input>
        </div>
        <button className={styles.add} onClick={this.addTray} data-locator='add-tray'>
          <span aria-label='add tray'>add</span>
        </button>
      </div>
    )
  }
}

AddTray.propTypes = {
  addTray: PropTypes.func.isRequired
}
