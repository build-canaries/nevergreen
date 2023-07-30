import type { ReactElement } from 'react'
import { useState } from 'react'
import { Checkbox } from '../../common/forms/Checkbox'
import { getClickToShowMenu, setClickToShowMenu } from './OtherSettingsReducer'
import { Page } from '../../common/Page'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { Cogs } from '../../common/icons/Cogs'
import { WarningMessages } from '../../common/Messages'
import { DangerButton } from '../../common/forms/Button'
import { Bin } from '../../common/icons/Bin'
import { clear } from '../../configuration/LocalRepository'
import styles from './other-settings-page.scss'

export function OtherSettingsPage(): ReactElement {
  const dispatch = useAppDispatch()
  const clickToShowMenu = useAppSelector(getClickToShowMenu)
  const [resetting, setResetting] = useState(false)

  const resetConfiguration = async () => {
    setResetting(true)
    await clear()
    window.location.reload()
  }

  return (
    <Page title="Other settings" icon={<Cogs />}>
      <Checkbox
        checked={clickToShowMenu}
        onToggle={(newValue) => dispatch(setClickToShowMenu(newValue))}
      >
        Click to show menu
      </Checkbox>
      <WarningMessages
        messages={[
          'Please note, resetting your configuration can not be undone!',
          "It's recommended to make a backup before resetting.",
        ]}
      />
      <DangerButton
        className={styles.reset}
        onClick={() => void resetConfiguration()}
        disabled={resetting}
        icon={<Bin />}
      >
        Reset configuration back to defaults
      </DangerButton>
    </Page>
  )
}

export const Component = OtherSettingsPage
