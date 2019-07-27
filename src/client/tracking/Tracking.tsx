import React from 'react'
import {AddTray} from './AddTray'
import TrayContainer from './tray/TrayContainer'
import {Title} from '../common/Title'

interface TrackingProps {
  trayIds: string[];
  addTray: (url: string, username?: string, password?: string) => void;
  addTrayUsingToken: (url: string, authToken?: string) => void;
}

export function Tracking({trayIds, addTray, addTrayUsingToken}: TrackingProps) {
  return (
    <>
      <Title>Tracking</Title>
      <AddTray addTray={addTray} addTrayUsingToken={addTrayUsingToken}/>
      {trayIds.map((trayId, index) => <TrayContainer key={trayId} index={index} trayId={trayId}/>)}
    </>
  )
}
