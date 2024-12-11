import type { ReactElement } from 'react'
import cn from 'classnames'
import { SHOW_HELP_SHORTCUT } from '../help/Help'
import { triggerShortcut } from '../common/Keyboard'
import { Display } from '../common/icons/Display'
import { Question } from '../common/icons/Question'
import { Cog } from '../common/icons/Cog'
import { NavLink } from 'react-router-dom'
import styles from './header.scss'

interface HeaderProps {
  readonly hide: boolean
}

export function Header({ hide }: HeaderProps): ReactElement {
  const headerClassNames = cn(styles.siteHeader, {
    [styles.hide]: hide,
  })

  return (
    <header className={headerClassNames}>
      <div className={styles.inner}>
        <img src="/canaries.svg" className={styles.logo} alt="" aria-hidden />
        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.menu}>
            <li>
              <NavLink
                to="monitor"
                className={({ isActive }) => {
                  return cn(styles.menuItem, { [styles.active]: isActive })
                }}
              >
                <Display />
                <div className={styles.menuTitle}>Monitor</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="settings"
                className={({ isActive }) => {
                  return cn(styles.menuItem, { [styles.active]: isActive })
                }}
              >
                <Cog />
                <div className={styles.menuTitle}>Settings</div>
              </NavLink>
            </li>
            <li>
              <button
                className={styles.helpButton}
                onClick={() => {
                  triggerShortcut(SHOW_HELP_SHORTCUT)
                }}
              >
                <Question />
                <div className={styles.menuTitle}>Help</div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
