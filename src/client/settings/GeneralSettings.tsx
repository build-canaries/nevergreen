import React from 'react'
import {secondsToString} from '../common/DateTime'
import {Container} from '../common/Container'
import {DropDown} from '../common/forms/DropDown'
import styles from './general-settings.scss'
import {Checkbox} from '../common/forms/Checkbox'
import {WithHelp} from '../common/ContextualHelp'

interface ClickToShowMenuHelpProps {
  enabled: boolean;
}

export interface GeneralSettingsProps {
  refreshTime: number;
  setRefreshTime: (time: string) => void;
  validRefreshTimes: number[];
  clickToShowMenu: boolean;
  setClickToShowMenu: (clickToShow: boolean) => void;
}

function ClickToShowMenuHelp({enabled}: ClickToShowMenuHelpProps) {
  return (
    <>
      <p>
        While <em>disabled</em> (the default{!enabled && ', currently selected'}) moving the mouse on the
        Monitor page will show the menu.
      </p>
      <p>
        While <em>enabled</em> {enabled && '(currently selected)'} you will need to click while on the Monitor
        page to show the menu.
      </p>
      <p>
        The main reason to enable is if you are using some kind of tab rotation in your browser. Otherwise every time
        the browser rotates to the Nevergreen tab, a mouse move will be triggered and the menu will be shown.
      </p>
      <p>Regardless of whether this is enabled keyboard shortcuts can be used to navigate between all pages.</p>
    </>
  )
}

export function GeneralSettings({refreshTime, setRefreshTime, validRefreshTimes, clickToShowMenu, setClickToShowMenu}: GeneralSettingsProps) {

  const options = validRefreshTimes.map((time) => {
    return {value: time.toString(), display: secondsToString(time)}
  })

  return (
    <Container title='general' className={styles.container}>
      <DropDown className={styles.refreshTime}
                options={options}
                value={refreshTime}
                onChange={({target}) => setRefreshTime(target.value)}
                data-locator='refresh-time'>
        poll for CI changes every
      </DropDown>
      <WithHelp title='Click to show menu'
                help={<ClickToShowMenuHelp enabled={clickToShowMenu}/>}
                className={styles.clickToShowHelp}>
        <Checkbox checked={clickToShowMenu}
                  onToggle={(newValue) => setClickToShowMenu(newValue)}
                  className={styles.clickToShow}
                  data-locator='click-to-show-menu'>
          click to show menu
        </Checkbox>
      </WithHelp>
    </Container>
  )
}
