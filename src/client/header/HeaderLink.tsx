import React, {ReactElement} from 'react'
import cn from 'classnames'
import styles from './header.scss'
import {NavLink, useHistory} from 'react-router-dom'
import {useShortcut} from '../common/Keyboard'

interface HeaderLinkProps {
  readonly path: string;
  readonly title: string;
  readonly shortcuts: string | string[];
  readonly hideMenu: () => void;
}

export function HeaderLink({path, title, shortcuts, hideMenu}: HeaderLinkProps): ReactElement {
  const history = useHistory()

  useShortcut(shortcuts, () => history.push(path), [history, path])

  return (
    <li>
      <NavLink to={`/${path}`}
               className={styles.menuItem}
               activeClassName={styles.active}
               onClick={hideMenu}
               data-locator={`menu-${path}`}>
        <span className={cn(styles.menuIcon, styles[path])} aria-hidden/>
        <div className={styles.menuTitle}>{title}</div>
      </NavLink>
    </li>
  )
}
