import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './header.scss'
import logo from './buildcanaries-logo.png'
import {NavLink} from 'react-router-dom'
import Shortcut from '../common/Shortcut'

const MENU_ITEMS = [
  {id: 'monitor', title: 'monitor', shortcuts: ['m', '1']},
  {id: 'tracking', title: 'tracking', shortcuts: ['t', '2']},
  {id: 'success', title: 'success', shortcuts: ['s', '3']},
  {id: 'settings', title: 'settings', shortcuts: [',', '4']},
  {id: 'backup', title: 'backup', shortcuts: ['b', '5']},
  {id: 'help', title: 'help', shortcuts: ['h', '6']}
]

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {menuVisible: false}
  }

  toggleMenu = () => {
    this.setState({menuVisible: !this.state.menuVisible})
  }

  hideMenu = () => {
    this.setState({menuVisible: false})
  }

  render() {
    const headerClassNames = classNames(styles.siteHeader, {[styles.fullscreen]: this.props.fullScreen})
    const menuClassNames = classNames(styles.menu, {[styles.open]: this.state.menuVisible})
    const toggleLabel = this.state.menuVisible ? 'hide menu' : 'show menu'
    const iconClassNames = classNames({
      [styles.siteMenuShow]: !this.state.menuVisible,
      [styles.siteMenuHide]: this.state.menuVisible
    })

    return (
      <header role='banner' className={headerClassNames}>
        <h1 className={styles.title}>Nevergreen</h1>
        <img src={logo} className={styles.logo} alt='Build Canaries'/>
        <nav role='navigation' className={styles.siteMenu}>
          <h2 className={styles.subTitle}>Site menu</h2>
          <button className={styles.siteMenuToggle} onClick={this.toggleMenu} aria-label={toggleLabel}
                  aria-expanded={this.state.menuVisible}>
            <i className={iconClassNames}/>
          </button>
          <ul className={menuClassNames}>
            {
              MENU_ITEMS.map((item) => {
                const iconClasses = classNames(styles.menuIcon, styles[item.id])

                return (
                  <li key={item.id}>
                    <NavLink to={`/${item.id}`} className={styles.menuItem} activeClassName={styles.active}
                             onClick={this.hideMenu} data-locator={`menu-${item.id}`}>
                      <i className={iconClasses}/>
                      <span className={styles.menuTitle}>{item.title}</span>
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

export default Header
