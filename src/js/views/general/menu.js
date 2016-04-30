import React from 'react'
import {Link} from 'react-router'
import Shortcut from './Shortcut'

const MenuItem = React.createClass({
  displayName: 'MenuItem',

  propTypes: {
    iconClass: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    shortcuts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  render() {
    return (
      <li>
        <Link id={this.props.id} to={'/' + this.props.id} className='navigation-list-item' activeClassName='active'>
          <span className={'navigation-list-item-icon ' + this.props.iconClass}/>
          <span className='navigation-list-item-title'>{this.props.title}</span>
          <Shortcut hotkeys={this.props.shortcuts}/>
        </Link>
      </li>
    )
  }
})

module.exports = React.createClass({
  displayName: 'Menu',

  propTypes: {
    versionNumber: React.PropTypes.string,
    versionName: React.PropTypes.string,
    commitHash: React.PropTypes.string,
    versionColour: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      items: [
        {id: 'monitor', iconClass: 'eye', title: 'Monitor', shortcuts: ['m', '1']},
        {id: 'tracking', iconClass: 'drawer2', title: 'Tracking', shortcuts: ['t', '2']},
        {id: 'success', iconClass: 'checkmark', title: 'Success', shortcuts: ['s', '3']},
        {id: 'display', iconClass: 'display', title: 'Audio/Visual', shortcuts: ['d', '4']},
        {id: 'export', iconClass: 'floppy-disk', title: 'Export', shortcuts: ['e', '5']},
        {id: 'help', iconClass: 'question', title: 'Help', shortcuts: ['h', '6']}
      ]
    }
  },

  render() {
    const footerStyle = {
      backgroundColor: this.props.versionColour
    }

    return (
      <div>
        <nav role='navigation' className='navigation'>
          <h2 className='visually-hidden'>Navigation</h2>

          <a href='https://build-canaries.github.io/' target='_blank'>
            <img src='img/buildcanaries-logo.png'
                 className='header-logo'
                 alt='Build Canaries logo'
                 title='Click to visit the Build Canaries homepage'/>
          </a>

          <ul className='navigation-list'>
            {
              this.props.items.map(item => {
                return <MenuItem key={item.id} id={item.id}
                                 iconClass={'icon-' + item.iconClass}
                                 title={item.title}
                                 shortcuts={item.shortcuts}/>
              })
            }
          </ul>
        </nav>
        <footer role='contentinfo' className='content-info' style={footerStyle}>
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
})
