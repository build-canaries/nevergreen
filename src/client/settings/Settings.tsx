import React, {ReactElement} from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import styles from './settings.scss'
import {List} from '../common/icons/List'
import {Display} from '../common/icons/Display'
import {Bell} from '../common/icons/Bell'
import {FloppyDisk} from '../common/icons/FloppyDisk'
import {Bin} from '../common/icons/Bin'
import {Image} from '../common/icons/Image'
import cn from 'classnames'

interface MenuItemProps {
  readonly to: string;
  readonly label: string;
  readonly icon: ReactElement;
}

function MenuItem({to, label, icon}: MenuItemProps): ReactElement {
  return (
    <li role='none'>
      <NavLink to={to}
               className={({isActive}) => {
                 return cn(styles.link, {[styles.activeLink]: isActive})
               }}
               role='menuitem'>
        {icon}
        {label}
      </NavLink>
    </li>
  )
}

export function Settings(): ReactElement {
  return (
    <div className={styles.settings}>
      <ul className={styles.menu} role='menu' aria-label='Settings'>
        <MenuItem to='tracking' label='Tracking' icon={<List/>}/>
        <MenuItem to='success' label='Success' icon={<Image/>}/>
        <MenuItem to='display' label='Display' icon={<Display/>}/>
        <MenuItem to='notifications' label='Notifications' icon={<Bell/>}/>
        <MenuItem to='backup' label='Backup' icon={<FloppyDisk/>}/>
        <MenuItem to='reset' label='Reset' icon={<Bin/>}/>
      </ul>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
