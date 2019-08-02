import React from 'react'
import {AddTray} from './AddTray'
import TrayContainer from './tray/TrayContainer'
import {Title} from '../common/Title'
import {AuthDetails} from '../domain/Tray'

interface TrackingProps {
  trayIds: string[];
  addTray: (url: string, auth: AuthDetails) => void;
}

export function Tracking({trayIds, addTray}: TrackingProps) {
  return (
    <>
      <Title>Tracking</Title>
      <AddTray addTray={addTray}/>
      {trayIds.map((trayId, index) => <TrayContainer key={trayId} index={index} trayId={trayId}/>)}
    </>
  )
}
