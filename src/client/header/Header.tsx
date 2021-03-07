import React, {ReactElement, useState} from 'react'
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
  const [menuVisible, setMenuVisible] = useState(false)

  const headerClassNames = cn(styles.siteHeader, {
    [styles.fullscreen]: fullScreen
  })
  const menuClassNames = cn(styles.menu, {
    [styles.open]: menuVisible
  })
  const iconClassNames = cn({
    [styles.siteMenuShow]: !menuVisible,
    [styles.siteMenuHide]: menuVisible
  })
  const toggleLabel = menuVisible ? 'hide menu' : 'show menu'

  const hideMenu = () => setMenuVisible(false)

  return (
    <header className={headerClassNames} role='banner'>
      <div className={styles.inner}>
        <img src={logo} className={styles.logo} alt='Nevergreen' aria-hidden/>
        <nav className={styles.siteMenu} role='navigation'>
          <button className={styles.siteMenuToggle}
                  onClick={() => setMenuVisible(!menuVisible)}
                  aria-label={toggleLabel}
                  aria-expanded={menuVisible}
                  type='button'>
            <span className={iconClassNames} aria-hidden/>
          </button>
          <ul className={menuClassNames}>
            <HeaderLink path='monitor' title='Monitor' shortcuts={['m', '1']} hideMenu={hideMenu}/>
            <HeaderLink path='tracking' title='Tracking' shortcuts={['t', '2']} hideMenu={hideMenu}/>
            <HeaderLink path='settings' title='Settings' shortcuts={['s', ',', '3']} hideMenu={hideMenu}/>
            <li>
              <button className={styles.helpButton}
                      onClick={() => {
                        triggerShortcut(SHOW_HELP_SHORTCUT)
                        hideMenu()
                      }}>
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
