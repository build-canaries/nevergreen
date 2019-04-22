import React, {useState, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../../common/forms/Input'
import {DropDown} from '../../common/forms/DropDown'
import {CI_OPTIONS, generateRandomName} from '../../domain/Tray'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {DangerButton, InputButton, PrimaryButton, SecondaryButton} from '../../common/forms/Button'
import {iBin, iCross, iDice, iFloppyDisk, iUnlocked} from '../../common/fonts/Icons'
import styles from './tray-settings.scss'
import {Password} from '../../common/forms/Password'
import {Checkbox} from '../../common/forms/Checkbox'

export function TraySettings({trayId, name, url, username, password, serverType, includeNew, removeTray, setTrayName, setTrayUrl, setServerType, setTrayUsername, encryptPassword, setIncludeNew}) {
  const [newName, setNewName] = useState(name)
  const [newUrl, setNewUrl] = useState(url)
  const [newUsername, setNewUsername] = useState(username)
  const [newPassword, setNewPassword] = useState('')
  const [updatingPassword, setUpdatingPassword] = useState(false)

  useLayoutEffect(() => setNewName(name), [name])

  const existingPassword = password ? '*******' : ''
  const passwordValue = updatingPassword ? newPassword : existingPassword

  const setPassword = () => {
    encryptPassword(trayId, newPassword)
    setUpdatingPassword(false)
    setNewPassword('')
  }

  const randomNameButton = (
    <InputButton icon={iDice}
                 onClick={() => setTrayName(trayId, generateRandomName())}
                 data-locator='generate-random'>
      randomise name
    </InputButton>
  )

  return (
    <section data-locator='tray-settings'>
      <VisuallyHidden><h3>Settings</h3></VisuallyHidden>
      <Input className={styles.traySettingsName}
             value={newName}
             onChange={({target}) => setNewName(target.value)}
             onBlur={() => setTrayName(trayId, newName)}
             onEnter={() => setTrayName(trayId, newName)}
             placeholder='e.g. project or team name'
             data-locator='tray-name'
             button={randomNameButton}>
        <span className={styles.label}>name</span>
      </Input>
      <Input value={newUrl}
             onChange={({target}) => setNewUrl(target.value)}
             onBlur={() => setTrayUrl(trayId, newUrl)}
             onEnter={() => setTrayUrl(trayId, newUrl)}
             data-locator='tray-url'
             autoComplete='url'>
        <span className={styles.label}>URL</span>
      </Input>
      <DropDown className={styles.serverType}
                options={CI_OPTIONS}
                value={serverType}
                onChange={({target}) => setServerType(trayId, target.value)}
                data-locator='tray-server-type'>
        <span className={styles.label}>server type</span>
      </DropDown>
      <Input className={styles.traySettingsUsername}
             value={newUsername}
             onChange={({target}) => setNewUsername(target.value)}
             onBlur={() => setTrayUsername(trayId, newUsername)}
             onEnter={() => setTrayUsername(trayId, newUsername)}
             data-locator='tray-username'
             autoComplete='username'>
        <span className={styles.label}>username</span>
      </Input>
      <Password className={styles.existingPassword}
                value={passwordValue}
                onChange={({target}) => setNewPassword(target.value)}
                onEnter={setPassword}
                readOnly={!updatingPassword}
                focus={updatingPassword}
                data-locator='tray-password'>
        <span className={styles.label}>password</span>
      </Password>
      {updatingPassword
        ? (
          <>
            <SecondaryButton className={styles.changePasswordButtons}
                             icon={iCross}
                             onClick={() => setUpdatingPassword(false)}
                             data-locator='change-password-cancel'>
              discard changes
            </SecondaryButton>
            <PrimaryButton className={styles.changePasswordButtons}
                           icon={iFloppyDisk}
                           onClick={setPassword}
                           data-locator='change-password-update'>
              save changes
            </PrimaryButton>
          </>
        ) : (
          <SecondaryButton className={styles.changePasswordButtons}
                           icon={iUnlocked}
                           onClick={() => setUpdatingPassword(true)}
                           data-locator='change-password'>
            change password
          </SecondaryButton>
        )
      }
      <Checkbox checked={includeNew}
                onToggle={(newValue) => setIncludeNew(trayId, newValue)}
                className={styles.includeNew}
                data-locator='include-new'>
        automatically include new projects
      </Checkbox>
      <div className={styles.dangerZone}>
        <h4 className={styles.dangerZoneTitle}>Danger Zone</h4>
        <div className={styles.dangerZoneContent}>
          <div className={styles.deleteInfo}>Once you delete, there is no going back. Please be certain.</div>
          <DangerButton icon={iBin}
                        onClick={() => removeTray(trayId)}
                        data-locator='delete-tray'>
            delete
          </DangerButton>
        </div>
      </div>
    </section>
  )
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
  setTrayUrl: PropTypes.func.isRequired,
  includeNew: PropTypes.bool,
  setIncludeNew: PropTypes.func.isRequired
}
