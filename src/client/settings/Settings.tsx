import type { ReactElement } from 'react'
import cn from 'classnames'
import { NavLink, Outlet } from 'react-router-dom'
import { List } from '../common/icons/List'
import { Display } from '../common/icons/Display'
import { Bell } from '../common/icons/Bell'
import { FloppyDisk } from '../common/icons/FloppyDisk'
import { Bin } from '../common/icons/Bin'
import { Image } from '../common/icons/Image'
import styles from './settings.scss'
import { Cogs } from '../common/icons/Cogs'

interface MenuItemProps {
  readonly to: string
  readonly label: string
  readonly icon: ReactElement
}

function MenuItem({ to, label, icon }: MenuItemProps): ReactElement {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => {
          return cn(styles.link, { [styles.activeLink]: isActive })
        }}
      >
        {icon}
        {label}
      </NavLink>
    </li>
  )
}

export function Settings(): ReactElement {
  return (
    <div className={styles.settings}>
      <nav aria-label="Settings" className={styles.nav}>
        <ul className={styles.menu}>
          <MenuItem to="tracking" label="Tracking" icon={<List />} />
          <MenuItem to="success" label="Success" icon={<Image />} />
          <MenuItem to="display" label="Display" icon={<Display />} />
          <MenuItem to="notifications" label="Notifications" icon={<Bell />} />
          <MenuItem to="backup" label="Backup" icon={<FloppyDisk />} />
          <MenuItem to="other" label="Other" icon={<Cogs />} />
          <MenuItem to="reset" label="Reset" icon={<Bin />} />
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
