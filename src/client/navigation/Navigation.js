import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import './navigation.scss'
import './footer.scss'
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

class Menu extends Component {
  render() {
    const footerStyle = {
      backgroundColor: this.props.versionColour
    }

    return (
      <div className='navigation'>
        <header>
          <h2 className='visually-hidden'>Navigation</h2>
          <a href='https://build-canaries.github.io/' target='_blank'>
            <img src={logo} className='logo' alt='Build Canaries' title='Click to visit the Build Canaries homepage'/>
          </a>
          <nav role='navigation'>
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
        <footer role='contentinfo' className='footer' style={footerStyle}>
          <a href='https://github.com/build-canaries/nevergreen/releases' target='_blank' className='version'>
            <p>v{this.props.versionNumber}</p>
            <p>{this.props.versionName}</p>
          </a>
          <a href='https://github.com/build-canaries/nevergreen/commits/master' target='_blank' className='version'>
            <p className='commit-hash'>{`<${this.props.commitHash}>`}</p>
          </a>
        </footer>
      </div>
    )
  }
}

Menu.propTypes = {
  versionNumber: PropTypes.string,
  versionName: PropTypes.string,
  commitHash: PropTypes.string,
  versionColour: PropTypes.string
}

export default Menu
