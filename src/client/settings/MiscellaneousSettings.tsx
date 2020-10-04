import React, {ReactElement} from 'react'
import {Container} from '../common/Container'
import {Checkbox} from '../common/forms/Checkbox'
import styles from './display-settings.scss'
import {useDispatch, useSelector} from 'react-redux'
import {toggleVersionCheck} from './SettingsActionCreators'
import {getToggleVersionCheck} from './SettingsReducer'

export function MiscellaneousSettings(): ReactElement {
  const dispatch = useDispatch()
  const toggleVersionCheckFlag = useSelector(getToggleVersionCheck)

  return (
    <Container title='Miscellaneous' className={styles.container}>
      <Checkbox className={styles.checkbox}
                checked={toggleVersionCheckFlag}
                onToggle={() => dispatch(toggleVersionCheck())}
                data-locator='toggle-version-check'>
        Check for updates
      </Checkbox>
    </Container>
  )
}
