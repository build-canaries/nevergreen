import React, {ReactElement} from 'react'
import cn from 'classnames'
import styles from './header.scss'
import {NavLink, useHistory} from 'react-router-dom'
import {useShortcut} from '../common/Keyboard'

interface HeaderLinkProps {
  readonly path: string;
  readonly title: string;
  readonly shortcuts: string | string[];
}

export function HeaderLink({path, title, shortcuts}: HeaderLinkProps): ReactElement {
  const history = useHistory()
  const icon = path.replace('/', '')

  useShortcut(shortcuts, () => history.push(path), [history, path])

  return (
    <li>
      <NavLink to={path}
               className={styles.menuItem}
               activeClassName={styles.active}>
        <span className={cn(styles.menuIcon, styles[icon])} aria-hidden/>
        <div className={styles.menuTitle}>{title}</div>
      </NavLink>
    </li>
  )
}
