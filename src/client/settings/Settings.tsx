import type { ReactElement } from 'react'
import cn from 'classnames'
import { NavLink, Outlet, useNavigation } from 'react-router'
import { List } from '../common/icons/List'
import { Display } from '../common/icons/Display'
import { Bell } from '../common/icons/Bell'
import { FloppyDisk } from '../common/icons/FloppyDisk'
import { Image } from '../common/icons/Image'
import { Cogs } from '../common/icons/Cogs'
import styles from './settings.scss'
import { Loading } from '../common/Loading'
import { AidKit } from '../common/icons/AidKit'

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
  const { state } = useNavigation()

  return (
    <div className={styles.settings}>
      <nav aria-label="Settings" className={styles.nav}>
        <ul className={styles.menu}>
          <MenuItem to="tracking" label="Tracking" icon={<List />} />
          <MenuItem to="success" label="Success" icon={<Image />} />
          <MenuItem to="display" label="Display" icon={<Display />} />
          <MenuItem to="notifications" label="Notifications" icon={<Bell />} />
          <MenuItem to="prognosis" label="Prognosis" icon={<AidKit />} />
          <MenuItem to="backup" label="Backup" icon={<FloppyDisk />} />
          <MenuItem to="other" label="Other" icon={<Cogs />} />
        </ul>
      </nav>
      <Loading isLoading={state === 'loading'} title={'Settings'}>
        <Outlet />
      </Loading>
    </div>
  )
}
