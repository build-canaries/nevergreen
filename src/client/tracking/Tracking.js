import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {AddTray} from './AddTray'
import TrayContainer from './tray/TrayContainer'
import {Title} from '../common/Title'

export function Tracking({trayIds, addTray}) {
  return (
    <Fragment>
      <Title>Tracking</Title>
      <AddTray addTray={addTray}/>
      {trayIds.map((trayId, index) => <TrayContainer key={trayId} index={index} trayId={trayId}/>)}
    </Fragment>
  )
}

Tracking.propTypes = {
  trayIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTray: PropTypes.func.isRequired
}
