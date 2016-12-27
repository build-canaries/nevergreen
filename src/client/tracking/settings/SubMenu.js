import React, {Component, PropTypes} from 'react'
import ShortcutContainer from '../../common/shortcut/ShortcutContainer'
import './sub-menu.scss'

class SubMenu extends Component {
  render() {
    return (
      <div className='tray-sub-bar'>
        <button className='show-projects' onClick={this.props.toggleSettingsView}>
          show projects
          <ShortcutContainer hotkeys={[`p ${this.props.index}`]}/>
        </button>
      </div>
    )
  }
}

SubMenu.propTypes = {
  index: PropTypes.number.isRequired,
  toggleSettingsView: PropTypes.func.isRequired
}

export default SubMenu
