import React, {useLayoutEffect, useState} from 'react'
import {Input} from '../../common/forms/Input'
import {DropDown} from '../../common/forms/DropDown'
import {AuthDetails, AuthTypes, CI_OPTIONS, generateRandomName} from '../../domain/Tray'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {DangerButton, InputButton, SecondaryButton} from '../../common/forms/Button'
import {iBin, iDice, iUnlocked} from '../../common/fonts/Icons'
import styles from './tray-settings.scss'
import {Checkbox} from '../../common/forms/Checkbox'
import {ChangeAuth} from './ChangeAuth'

interface TraySettingsProps {
  trayId: string;
  name: string;
  url: string;
  authType: AuthTypes;
  username: string;
  serverType: string;
  removeTray: (trayId: string) => void;
  setTrayName: (trayId: string, name: string) => void;
  setServerType: (trayId: string, serverType: string) => void;
  setTrayUrl: (trayId: string, url: string) => void;
  includeNew?: boolean;
  setIncludeNew: (trayId: string, includeNew: boolean) => void;
  setAuth: (trayId: string, auth: AuthDetails) => void;
}

export function TraySettings({trayId, name, url, authType, username, serverType, includeNew, removeTray, setTrayName, setTrayUrl, setServerType, setIncludeNew, setAuth}: TraySettingsProps) {
  const [newName, setNewName] = useState(name)
  const [newUrl, setNewUrl] = useState(url)
  const [updatingAuth, setUpdatingAuth] = useState(false)

  useLayoutEffect(() => setNewName(name), [name])
  useLayoutEffect(() => setNewUrl(url), [url])

  const updateAuth = (auth: AuthDetails) => {
    setAuth(trayId, auth)
    setUpdatingAuth(false)
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

      <ChangeAuth show={updatingAuth}
                  cancel={() => setUpdatingAuth(false)}
                  save={updateAuth}
                  authType={authType}
                  username={username}/>

      <Input readOnly
             value={authType}
             className={styles.authType}>
        <span className={styles.label}>auth</span>
      </Input>
      <SecondaryButton className={styles.changeAuth}
                       icon={iUnlocked}
                       onClick={() => setUpdatingAuth(true)}
                       data-locator='change-password'>
        change auth
      </SecondaryButton>

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