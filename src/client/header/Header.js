import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './header.scss'
import logo from './buildcanaries-logo.png'
import {NavLink} from 'react-router-dom'
import {Shortcut} from '../common/Shortcut'
import {Title} from '../common/Title'

const MENU_ITEMS = [
  {id: 'monitor', title: 'monitor', shortcuts: ['m', '1']},
  {id: 'tracking', title: 'tracking', shortcuts: ['t', '2']},
  {id: 'success', title: 'success', shortcuts: ['s', '3']},
  {id: 'settings', title: 'settings', shortcuts: [',', '4']},
  {id: 'backup', title: 'backup', shortcuts: ['b', '5']}
]

export class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {menuVisible: false}
  }

  toggleMenu = () => {
    this.setState(({menuVisible}) => {
      return {menuVisible: !menuVisible}
    })
  }

  hideMenu = () => {
    this.setState({menuVisible: false})
  }

  render() {
    const {fullScreen} = this.props
    const {menuVisible} = this.state

    const headerClassNames = classNames(styles.siteHeader, {
      [styles.fullscreen]: fullScreen
    })
    const menuClassNames = classNames(styles.menu, {
      [styles.open]: menuVisible
    })
    const iconClassNames = classNames({
      [styles.siteMenuShow]: !menuVisible,
      [styles.siteMenuHide]: menuVisible
    })
    const toggleLabel = menuVisible ? 'hide menu' : 'show menu'

    return (
      <header className={headerClassNames}>
        <img src={logo} className={styles.logo} alt='Nevergreen' aria-hidden/>
        <nav className={styles.siteMenu}>
          <Title>Site navigation</Title>
          <button className={styles.siteMenuToggle}
                  onClick={this.toggleMenu}
                  aria-label={toggleLabel}
                  aria-expanded={menuVisible}>
            <span className={iconClassNames}/>
          </button>
          <ul className={menuClassNames}>
            {
              MENU_ITEMS.map((item) => {
                const iconClasses = classNames(styles.menuIcon, styles[item.id])

                return (
                  <li key={item.id}>
                    <NavLink to={`/${item.id}`}
                             className={styles.menuItem}
                             activeClassName={styles.active}
                             onClick={this.hideMenu}
                             data-locator={`menu-${item.id}`}>
                      <span className={iconClasses}/>
                      <div className={styles.menuTitle}>{item.title}</div>
                      <Shortcut hotkeys={item.shortcuts}/>
                    </NavLink>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  fullScreen: PropTypes.bool
}
