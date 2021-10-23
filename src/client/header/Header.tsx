import React, {ReactElement} from 'react'
import cn from 'classnames'
import styles from './header.scss'
import logo from './buildcanaries-logo.png'
import {SHOW_HELP_SHORTCUT} from '../help/Help'
import {triggerShortcut} from '../common/Keyboard'
import {Display} from '../common/icons/Display'
import {Question} from '../common/icons/Question'
import {Cog} from '../common/icons/Cog'
import {NavLink} from 'react-router-dom'
import {ROUTE_MONITOR, ROUTE_SETTINGS} from '../Routes'

interface HeaderProps {
  readonly hide: boolean;
}

export function Header({hide}: HeaderProps): ReactElement {
  const headerClassNames = cn(styles.siteHeader, {
    [styles.hide]: hide
  })

  return (
    <header className={headerClassNames} role='banner'>
      <div className={styles.inner}>
        <img src={logo} className={styles.logo} alt='Nevergreen' aria-hidden/>
        <nav className={styles.nav} role='navigation'>
          <ul className={styles.menu}>
            <li>
              <NavLink to={ROUTE_MONITOR}
                       className={styles.menuItem}
                       activeClassName={styles.active}>
                <Display/>
                <div className={styles.menuTitle}>Monitor</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTE_SETTINGS}
                       className={styles.menuItem}
                       activeClassName={styles.active}>
                <Cog/>
                <div className={styles.menuTitle}>Settings</div>
              </NavLink>
            </li>
            <li>
              <button className={styles.helpButton}
                      onClick={() => triggerShortcut(SHOW_HELP_SHORTCUT)}>
                <Question/>
                <div className={styles.menuTitle}>Help</div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
