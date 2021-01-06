import React, {ReactElement} from 'react'
import {secondsToString} from '../common/DateTime'
import {Container} from '../common/Container'
import {DropDown} from '../common/forms/DropDown'
import styles from './general-settings.scss'
import {Checkbox} from '../common/forms/Checkbox'
import {useDispatch, useSelector} from 'react-redux'
import {getClickToShowMenu, getRefreshTime, getToggleVersionCheck} from './SettingsReducer'
import {setClickToShowMenu, setRefreshTime, toggleVersionCheck, VALID_REFRESH_TIMES} from './SettingsActionCreators'

export function GeneralSettings(): ReactElement {
  const dispatch = useDispatch()
  const refreshTime = useSelector(getRefreshTime)
  const clickToShowMenu = useSelector(getClickToShowMenu)
  const toggleVersionCheckFlag = useSelector(getToggleVersionCheck)

  const options = VALID_REFRESH_TIMES.map((time) => {
    return {value: time.toString(), display: secondsToString(time)}
  })

  return (
    <Container title='General' className={styles.container}>
      <DropDown className={styles.refreshTime}
                options={options}
                value={refreshTime}
                onChange={({target}) => dispatch(setRefreshTime(target.value))}
                data-locator='refresh-time'>
        Poll for feed changes every
      </DropDown>
      <Checkbox checked={clickToShowMenu}
                onToggle={(newValue) => dispatch(setClickToShowMenu(newValue))}
                data-locator='click-to-show-menu'>
        Click to show menu
      </Checkbox>
      <Checkbox checked={toggleVersionCheckFlag}
                onToggle={() => dispatch(toggleVersionCheck())}
                data-locator='toggle-version-check'>
        Check for new Nevergreen versions
      </Checkbox>
    </Container>
  )
}
