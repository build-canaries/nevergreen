import React, {ReactElement} from 'react'
import {Checkbox} from '../../common/forms/Checkbox'
import {useDispatch, useSelector} from 'react-redux'
import {getClickToShowMenu} from '../SettingsReducer'
import {setClickToShowMenu} from '../SettingsActionCreators'
import {Page} from '../../common/Page'
import {Cog} from '../../common/icons/Cog'

export function GeneralSettings(): ReactElement {
  const dispatch = useDispatch()
  const clickToShowMenu = useSelector(getClickToShowMenu)

  return (
    <Page title='General settings' icon={<Cog/>}>
      <Checkbox checked={clickToShowMenu}
                onToggle={(newValue) => dispatch(setClickToShowMenu(newValue))}>
        Click to show menu
      </Checkbox>
    </Page>
  )
}
