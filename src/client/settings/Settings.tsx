import { ReactElement, useState } from 'react'
import cn from 'classnames'
import { NavLink, Outlet, useNavigation } from 'react-router'
import { List } from '../common/icons/List'
import { Display } from '../common/icons/Display'
import { Bell } from '../common/icons/Bell'
import { FloppyDisk } from '../common/icons/FloppyDisk'
import { Image } from '../common/icons/Image'
import { Cogs } from '../common/icons/Cogs'
import { Loading } from '../common/Loading'
import { AidKit } from '../common/icons/AidKit'
import { Main } from '../common/Main'
import { Footer } from '../footer/Footer'
import styles from './settings.scss'
import { MenuClose } from '../common/icons/MenuClose'
import { MenuOpen } from '../common/icons/MenuOpen'

interface MenuItemProps {
  readonly to: string
  readonly label: string
  readonly icon: ReactElement
  readonly closeMenu: () => void
}

function MenuItem({ to, label, icon, closeMenu }: MenuItemProps): ReactElement {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => {
          return cn(styles.link, { [styles.activeLink]: isActive })
        }}
        onClick={closeMenu}
      >
        {icon}
        {label}
      </NavLink>
    </li>
  )
}

export function Settings(): ReactElement {
  const { state } = useNavigation()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <Main>
        <div className={styles.settings}>
          <nav aria-label="Settings" className={styles.nav}>
            <button
              className={styles.toggleMenu}
              onClick={() => {
                setMenuOpen((open) => !open)
              }}
            >
              {menuOpen ? <MenuClose /> : <MenuOpen />}
              {menuOpen ? 'Close settings menu' : 'Open settings menu'}
            </button>
            <ul
              className={cn(styles.menu, {
                [styles.menuOpen]: menuOpen,
                [styles.menuClosed]: !menuOpen,
              })}
            >
              <MenuItem
                to="tracking"
                label="Tracking"
                icon={<List />}
                closeMenu={closeMenu}
              />
              <MenuItem
                to="success"
                label="Success"
                icon={<Image />}
                closeMenu={closeMenu}
              />
              <MenuItem
                to="display"
                label="Display"
                icon={<Display />}
                closeMenu={closeMenu}
              />
              <MenuItem
                to="notifications"
                label="Notifications"
                icon={<Bell />}
                closeMenu={closeMenu}
              />
              <MenuItem
                to="prognosis"
                label="Prognosis"
                icon={<AidKit />}
                closeMenu={closeMenu}
              />
              <MenuItem
                to="backup"
                label="Backup"
                icon={<FloppyDisk />}
                closeMenu={closeMenu}
              />
              <MenuItem
                to="other"
                label="Other"
                icon={<Cogs />}
                closeMenu={closeMenu}
              />
            </ul>
          </nav>
          <Loading isLoading={state === 'loading'} title={'Settings'}>
            <Outlet />
          </Loading>
        </div>
      </Main>
      <Footer />
    </>
  )
}
