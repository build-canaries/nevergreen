import React, {ReactElement} from 'react'
import {Checkbox} from '../../common/forms/Checkbox'
import {useDispatch, useSelector} from 'react-redux'
import {getClickToShowMenu, getToggleVersionCheck} from '../SettingsReducer'
import {setClickToShowMenu, toggleVersionCheck} from '../SettingsActionCreators'
import {Page} from '../../common/Page'

export function GeneralSettings(): ReactElement {
  const dispatch = useDispatch()
  const clickToShowMenu = useSelector(getClickToShowMenu)
  const toggleVersionCheckFlag = useSelector(getToggleVersionCheck)

  return (
    <Page title='General settings'>
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
    </Page>
  )
}
