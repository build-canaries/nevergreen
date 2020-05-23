import React, {ReactElement, useEffect, useState} from 'react'
import {Input} from '../../common/forms/Input'
import {DropDown} from '../../common/forms/DropDown'
import {AuthTypes, CI_OPTIONS, generateRandomName, Tray} from '../../domain/Tray'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {DangerButton, InputButton, SecondaryButton} from '../../common/forms/Button'
import {iBin, iDice, iUnlocked} from '../../common/fonts/Icons'
import styles from './tray-settings.scss'
import {Checkbox} from '../../common/forms/Checkbox'
import {ChangeAuth} from './ChangeAuth'
import {useDispatch} from 'react-redux'
import {trayRemoved, trayUpdated} from '../TrackingActionCreators'

interface TraySettingsProps {
  readonly tray: Tray;
  readonly setRequiresRefresh: (required: boolean) => void;
}

export function TraySettings({tray, setRequiresRefresh}: TraySettingsProps): ReactElement {
  const dispatch = useDispatch()

  const {trayId, name, url, authType, username, serverType, includeNew} = tray

  const [newName, setNewName] = useState(name || '')
  const [newUrl, setNewUrl] = useState(url)
  const [updatingAuth, setUpdatingAuth] = useState(false)

  useEffect(() => setNewName(name || ''), [name])
  useEffect(() => setNewUrl(url), [url])

  const updateUrl = () => {
    if (newUrl !== url) {
      dispatch(trayUpdated(trayId, {url: newUrl}))
      setRequiresRefresh(true)
    }
  }

  const updateAuth = (authType: AuthTypes, username: string, encryptedPassword: string, encryptedAccessToken: string) => {
    dispatch(trayUpdated(trayId, {authType, username, encryptedPassword, encryptedAccessToken}))
    setUpdatingAuth(false)
    setRequiresRefresh(true)
  }

  const randomNameButton = (
    <InputButton icon={iDice}
                 onClick={() => dispatch(trayUpdated(trayId, {name: generateRandomName()}))}
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
             onBlur={() => dispatch(trayUpdated(trayId, {name: newName}))}
             onEnter={() => dispatch(trayUpdated(trayId, {name: newName}))}
             placeholder='e.g. project or team name'
             data-locator='tray-name'
             button={randomNameButton}>
        <span className={styles.label}>Name</span>
      </Input>
      <Input value={newUrl}
             onChange={({target}) => setNewUrl(target.value)}
             onBlur={updateUrl}
             onEnter={updateUrl}
             data-locator='tray-url'
             autoComplete='url'>
        <span className={styles.label}>URL</span>
      </Input>
      <DropDown className={styles.serverType}
                options={CI_OPTIONS}
                value={serverType}
                onChange={({target}) => {
                  dispatch(trayUpdated(trayId, {serverType: target.value}))
                  setRequiresRefresh(true)
                }}
                data-locator='tray-server-type'>
        <span className={styles.label}>Server type</span>
      </DropDown>

      <ChangeAuth show={updatingAuth}
                  cancel={() => setUpdatingAuth(false)}
                  save={updateAuth}
                  authType={authType}
                  username={username || ''}/>

      <Input readOnly
             value={authType}
             className={styles.authType}>
        <span className={styles.label}>Auth</span>
      </Input>
      <SecondaryButton className={styles.changeAuth}
                       icon={iUnlocked}
                       onClick={() => setUpdatingAuth(true)}
                       data-locator='change-password'>
        Change auth
      </SecondaryButton>

      <Checkbox checked={includeNew}
                onToggle={(newValue) => dispatch(trayUpdated(trayId, {includeNew: newValue}))}
                className={styles.includeNew}
                data-locator='include-new'>
        Automatically include new projects
      </Checkbox>
      <div className={styles.dangerZone}>
        <h4 className={styles.dangerZoneTitle}>Danger Zone</h4>
        <div className={styles.dangerZoneContent}>
          <div className={styles.deleteInfo}>Once you delete, there is no going back! Please be certain.</div>
          <DangerButton icon={iBin}
                        onClick={() => dispatch(trayRemoved(trayId))}
                        data-locator='delete-tray'>
            Delete feed
          </DangerButton>
        </div>
      </div>
    </section>
  )
}
