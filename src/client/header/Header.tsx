import React, {ReactElement} from 'react'
import cn from 'classnames'
import styles from './header.scss'
import logo from './buildcanaries-logo.png'
import {SHOW_HELP_SHORTCUT} from '../help/Help'
import {triggerShortcut} from '../common/Keyboard'
import {HeaderLink} from './HeaderLink'

interface HeaderProps {
  readonly fullScreen: boolean;
}

export function Header({fullScreen}: HeaderProps): ReactElement {
  const headerClassNames = cn(styles.siteHeader, {
    [styles.fullscreen]: fullScreen
  })

  return (
    <header className={headerClassNames} role='banner'>
      <div className={styles.inner}>
        <img src={logo} className={styles.logo} alt='Nevergreen' aria-hidden/>
        <nav className={styles.nav} role='navigation'>
          <ul className={styles.menu}>
            <HeaderLink path='/monitor' title='Monitor' shortcuts={['m', '1']}/>
            <HeaderLink path='/settings' title='Settings' shortcuts={['s', ',', '2']}/>
            <li>
              <button className={styles.helpButton}
                      onClick={() => triggerShortcut(SHOW_HELP_SHORTCUT)}>
                <span className={cn(styles.menuIcon, styles.help)} aria-hidden/>
                <div className={styles.menuTitle}>Help</div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
