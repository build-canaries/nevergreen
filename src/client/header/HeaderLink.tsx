import React, {ReactElement} from 'react'
import styles from './header.scss'
import {NavLink, useHistory} from 'react-router-dom'
import {useShortcut} from '../common/Keyboard'

interface HeaderLinkProps {
  readonly path: string;
  readonly title: string;
  readonly shortcuts: string | string[];
  readonly icon: ReactElement;
}

export function HeaderLink({path, title, shortcuts, icon}: HeaderLinkProps): ReactElement {
  const history = useHistory()

  useShortcut(shortcuts, () => history.push(path), [history, path])

  return (
    <li>
      <NavLink to={path}
               className={styles.menuItem}
               activeClassName={styles.active}>
        {icon}
        <div className={styles.menuTitle}>{title}</div>
      </NavLink>
    </li>
  )
}
