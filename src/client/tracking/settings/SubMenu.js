import React, {Component, PropTypes} from 'react'
import ShortcutContainer from '../../common/shortcut/ShortcutContainer'

class SubMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='tray-sub-bar'>
        <button className='button' onClick={this.props.toggleSettingsView} title='Show projects'>
          <span className='icon-list'/>
          <span className='text-with-icon'>Show projects</span>
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
