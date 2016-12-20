import React, {Component, PropTypes} from 'react'
import Button from '../../common/forms/Button'

class SubMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='tray-sub-bar'>
        <Button label='Show projects' icon='list' onClick={this.props.toggleSettingsView} hotkeys={[`p ${this.props.index}`]}/>
      </div>
    )
  }
}

SubMenu.propTypes = {
  index: PropTypes.number.isRequired,
  toggleSettingsView: PropTypes.func.isRequired
}

export default SubMenu
