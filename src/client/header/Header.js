import React, {Component} from 'react'
import classNames from 'classnames'
import './header.scss'
import logo from './buildcanaries-logo.png'
import {Link} from 'react-router'
import ShortcutContainer from '../common/shortcut/ShortcutContainer'

const items = [
  {id: 'monitor', iconClass: 'eye', title: 'monitor', shortcuts: ['m', '1']},
  {id: 'tracking', iconClass: 'drawer2', title: 'tracking', shortcuts: ['t', '2']},
  {id: 'success', iconClass: 'checkmark', title: 'success', shortcuts: ['s', '3']},
  {id: 'settings', iconClass: 'cog', title: 'settings', shortcuts: [',', '4']},
  {id: 'backup', iconClass: 'floppy-disk', title: 'backup', shortcuts: ['b', '5']},
  {id: 'help', iconClass: 'question', title: 'help', shortcuts: ['h', '6']}
]

class Header extends Component {
  render() {
    return (
      <header role='banner' className='site-header'>
        <h1 className='visually-hidden'>Nevergreen</h1>
        <a href='https://build-canaries.github.io/' target='_blank'>
          <img src={logo} className='logo' alt='Build Canaries' title='Visit the Build Canaries homepage'/>
        </a>
        <nav role='navigation'>
          <h2 className='visually-hidden'>Navigation</h2>
          <ul className='menu'>
            {
              items.map((item) => {
                const iconClasses = classNames('menu-icon', `icon-${item.iconClass}`)

                return (
                  <li key={item.id}>
                    <Link to={`/${item.id}`} className='menu-item' activeClassName='active' data-locator={`menu-${item.id}`}>
                      <span className={iconClasses}/>
                      <span className='menu-title'>{item.title}</span>
                      <ShortcutContainer hotkeys={item.shortcuts}/>
                    </Link>
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

export default Header
