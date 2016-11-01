import React, {Component, PropTypes} from 'react'
import AddTray from './AddTray'
import TrayContainer from './tray/TrayContainer'
import './tracking.scss'

class Tracking extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className='tracking'>
        <h2 className='visually-hidden'>Tracking</h2>
        <AddTray addTray={this.props.addTray}/>
        <div>
          {this.props.trays.map((tray, index) => <TrayContainer key={tray.trayId} index={index} {...tray}/>)}
        </div>
      </section>
    )
  }
}

Tracking.propTypes = {
  trays: PropTypes.arrayOf(PropTypes.shape({
    trayId: PropTypes.string.isRequired
  })).isRequired,
  addTray: PropTypes.func.isRequired
}

export default Tracking
