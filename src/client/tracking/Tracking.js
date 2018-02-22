import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import AddTray from './AddTray'
import TrayContainer from './tray/TrayContainer'
import Title from '../common/Title'

class Tracking extends Component {
  render() {
    return (
      <Fragment>
        <Title>Tracking</Title>
        <AddTray addTray={this.props.addTray} existingTrayIds={this.props.trayIds}/>
        {this.props.trayIds.map((trayId, index) => <TrayContainer key={trayId} index={index} trayId={trayId}/>)}
      </Fragment>
    )
  }
}

Tracking.propTypes = {
  trayIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTray: PropTypes.func.isRequired
}

export default Tracking
