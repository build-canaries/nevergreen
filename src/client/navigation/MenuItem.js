import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Shortcut from '../common/Shortcut'

class MenuItem extends Component {
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
}

MenuItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortcuts: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default MenuItem
