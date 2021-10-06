import React, {ReactElement} from 'react'
import cn from 'classnames'
import styles from './header.scss'
import logo from './buildcanaries-logo.png'
import {SHOW_HELP_SHORTCUT} from '../help/Help'
import {triggerShortcut} from '../common/Keyboard'
import {HeaderLink} from './HeaderLink'
import {Display} from '../common/icons/Display'
import {Question} from '../common/icons/Question'
import {Cog} from '../common/icons/Cog'

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
            <HeaderLink path='/monitor'
                        title='Monitor'
                        shortcuts={['m', '1']}
                        icon={<Display/>}/>
            <HeaderLink path='/settings'
                        title='Settings'
                        shortcuts={['s', ',', '2']}
                        icon={<Cog/>}/>
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
