import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../../common/forms/Input'
import {DropDown} from '../../common/forms/DropDown'
import {CI_OPTIONS, generateRandomName} from '../../domain/Tray'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {DangerButton, InputButton, PrimaryButton, SecondaryButton} from '../../common/forms/Button'
import {iBin, iCross, iDice, iFloppyDisk, iUnlocked} from '../../common/fonts/Icons'
import styles from './tray-settings.scss'
import {Password} from '../../common/forms/Password'

export class TraySettings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newName: props.name,
      newUrl: props.url,
      newUsername: props.username,
      newPassword: '',
      updatingPassword: false
    }
  }

  nameChanged = (evt) => {
    this.setState({newName: evt.target.value})
  }

  setName = () => {
    this.props.setTrayName(this.props.trayId, this.state.newName)
  }

  generateNewName = () => {
    this.setState({newName: generateRandomName()}, () => this.setName())
  }

  serverTypeChange = (evt) => {
    this.props.setServerType(this.props.trayId, evt.target.value)
  }

  usernameChanged = (evt) => {
    this.setState({newUsername: evt.target.value})
  }

  setUsername = () => {
    this.props.setTrayUsername(this.props.trayId, this.state.newUsername)
  }

  passwordChanged = (evt) => {
    this.setState({newPassword: evt.target.value})
  }

  deleteTray = () => {
    this.props.removeTray(this.props.trayId)
  }

  cancel = () => {
    this.setState({updatingPassword: false})
  }

  changePassword = () => {
    this.setState({updatingPassword: true})
  }

  setPassword = () => {
    this.props.encryptPassword(this.props.trayId, this.state.newPassword)
    this.setState({updatingPassword: false, newPassword: ''})
  }

  urlChanged = (evt) => {
    this.setState({newUrl: evt.target.value})
  }

  setUrl = () => {
    this.props.setTrayUrl(this.props.trayId, this.state.newUrl)
  }

  render() {
    const {password, serverType} = this.props
    const {updatingPassword, newPassword, newName, newUrl, newUsername} = this.state

    const existingPassword = password ? '*******' : ''
    const passwordValue = updatingPassword ? newPassword : existingPassword

    const randomNameButton = (
      <InputButton icon={iDice}
                   onClick={this.generateNewName}
                   data-locator='generate-random'>
        randomise name
      </InputButton>
    )

    return (
      <section data-locator='tray-settings'>
        <VisuallyHidden><h3>Settings</h3></VisuallyHidden>
        <Input className={styles.traySettingsName}
               value={newName}
               onChange={this.nameChanged}
               onBlur={this.setName}
               onEnter={this.setName}
               placeholder='e.g. project or team name'
               data-locator='tray-name'
               button={randomNameButton}>
          <span className={styles.label}>name</span>
        </Input>
        <Input value={newUrl}
               onChange={this.urlChanged}
               onBlur={this.setUrl}
               onEnter={this.setUrl}
               data-locator='tray-url'
               autoComplete='url'>
          <span className={styles.label}>URL</span>
        </Input>
        <DropDown className={styles.serverType}
                  options={CI_OPTIONS}
                  value={serverType}
                  onChange={this.serverTypeChange}
                  data-locator='tray-server-type'>
          <span className={styles.label}>server type</span>
        </DropDown>
        <Input className={styles.traySettingsUsername}
               value={newUsername}
               onChange={this.usernameChanged}
               onBlur={this.setUsername}
               onEnter={this.setUsername}
               data-locator='tray-username'
               autoComplete='username'>
          <span className={styles.label}>username</span>
        </Input>
        <Password className={styles.existingPassword}
                  value={passwordValue}
                  onChange={this.passwordChanged}
                  onEnter={this.setPassword}
                  readOnly={!updatingPassword}
                  focus={updatingPassword}
                  data-locator='tray-password'>
          <span className={styles.label}>password</span>
        </Password>
        {updatingPassword
          ? (
            <Fragment>
              <SecondaryButton className={styles.changePasswordButtons}
                               icon={iCross}
                               onClick={this.cancel}
                               data-locator='change-password-cancel'>
                discard changes
              </SecondaryButton>
              <PrimaryButton className={styles.changePasswordButtons}
                             icon={iFloppyDisk}
                             onClick={this.setPassword}
                             data-locator='change-password-update'>
                save changes
              </PrimaryButton>
            </Fragment>
          ) : (
            <SecondaryButton className={styles.changePasswordButtons}
                             icon={iUnlocked}
                             onClick={this.changePassword}
                             data-locator='change-password'>
              change password
            </SecondaryButton>
          )
        }
        <div className={styles.dangerZone}>
          <h4 className={styles.dangerZoneTitle}>Danger Zone</h4>
          <div className={styles.dangerZoneContent}>
            <div className={styles.deleteInfo}>Once you delete, there is no going back. Please be certain.</div>
            <DangerButton icon={iBin}
                          onClick={this.deleteTray}
                          data-locator='delete-tray'>
              delete
            </DangerButton>
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
  serverType: PropTypes.string,
  removeTray: PropTypes.func.isRequired,
  setTrayName: PropTypes.func.isRequired,
  setServerType: PropTypes.func.isRequired,
  setTrayUsername: PropTypes.func.isRequired,
  encryptPassword: PropTypes.func.isRequired,
  setTrayUrl: PropTypes.func.isRequired
}
