import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import {WithHelp} from '../common/ContextualHelp'
import {TrackingHelp} from './TrackingHelp'
import styles from './add-tray.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iPlus} from '../common/fonts/Icons'
import {Password} from '../common/forms/Password'

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
        <div className={styles.inputs}>
          <Input className={styles.url}
                 placeholder='CCTray XML feed'
                 value={url}
                 onChange={this.updateUrl}
                 onEnter={this.addTrayAndClearInput}
                 data-locator='add-tray-url'
                 autoComplete='url'>
            <span className={styles.label}>URL</span>
          </Input>
          <Input className={styles.username}
                 value={username}
                 onChange={this.updateUsername}
                 onEnter={this.addTrayAndClearInput}
                 data-locator='add-tray-username'
                 autoComplete='username'>
            <span className={styles.label}>username</span>
          </Input>
          <Password className={styles.password}
                    value={password}
                    onChange={this.updatePassword}
                    onEnter={this.addTrayAndClearInput}
                    data-locator='add-tray-password'>
            <span className={styles.label}>password</span>
          </Password>
        </div>
        <WithHelp title='Tracking'
                  help={<TrackingHelp addTray={addTray}/>}
                  className={styles.help}>
          <PrimaryButton className={styles.add}
                         onClick={this.addTrayAndClearInput}
                         data-locator='add-tray'
                         icon={iPlus}>
            <span aria-label='add tray'>add</span>
          </PrimaryButton>
        </WithHelp>
      </div>
    )
  }
}

AddTray.propTypes = {
  addTray: PropTypes.func.isRequired
}
