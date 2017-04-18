import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AddTray from './AddTray'
import TrayContainer from './tray/TrayContainer'
import './tracking.scss'

class Tracking extends Component {
  render() {
    return (
      <section className='tracking'>
        <h2 className='visually-hidden'>Tracking</h2>
        <AddTray addTray={this.props.addTray} existingTrayIds={this.props.trayIds}/>
        {this.props.trayIds.map((trayId, index) => <TrayContainer key={trayId} index={index} trayId={trayId}/>)}
      </section>
    )
  }
}

Tracking.propTypes = {
  trayIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTray: PropTypes.func.isRequired
}

export default Tracking
