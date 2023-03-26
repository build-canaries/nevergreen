import type { ReactElement } from 'react'
import { Checkbox } from '../../common/forms/Checkbox'
import { getClickToShowMenu, setClickToShowMenu } from './OtherSettingsReducer'
import { Page } from '../../common/Page'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { Cogs } from '../../common/icons/Cogs'

export function OtherSettingsPage(): ReactElement {
  const dispatch = useAppDispatch()
  const clickToShowMenu = useAppSelector(getClickToShowMenu)

  return (
    <Page title="Other settings" icon={<Cogs />}>
      <Checkbox
        checked={clickToShowMenu}
        onToggle={(newValue) => dispatch(setClickToShowMenu(newValue))}
      >
        Click to show menu
      </Checkbox>
    </Page>
  )
}
