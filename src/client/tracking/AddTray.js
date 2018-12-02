import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import {ContextualHelp, InlineHelp} from '../common/ContextualHelp'
import {TrackingHelp} from './TrackingHelp'
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

  addTrayAndClearInput = () => {
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
    const {addTray} = this.props

    return (
      <div className={styles.addTray}>
        <InlineHelp>
          <div className={styles.inputs}>
            <Input className={styles.url}
                   placeholder='CCTray XML file'
                   value={url}
                   onChange={this.updateUrl}
                   onEnter={this.addTrayAndClearInput}
                   data-locator='add-tray-url'
                   autoComplete='url'>
              <div className={styles.label}>URL</div>
            </Input>
            <Input className={styles.username}
                   value={username}
                   onChange={this.updateUsername}
                   onEnter={this.addTrayAndClearInput}
                   data-locator='add-tray-username'
                   autoComplete='username'>
              <div className={styles.label}>username</div>
            </Input>
            <Input type='password'
                   className={styles.password}
                   value={password}
                   onChange={this.updatePassword}
                   onEnter={this.addTrayAndClearInput}
                   data-locator='add-tray-password'
                   autoComplete='new-password'>
              <div className={styles.label}>password</div>
            </Input>
          </div>
          <ContextualHelp title='Add tray'
                          help={<TrackingHelp addTray={addTray}/>}
                          className={styles.help}/>
        </InlineHelp>
        <button className={styles.add} onClick={this.addTrayAndClearInput} data-locator='add-tray'>
          <span aria-label='add tray'>add</span>
        </button>
      </div>
    )
  }
}

AddTray.propTypes = {
  addTray: PropTypes.func.isRequired
}
