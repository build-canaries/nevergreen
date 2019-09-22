import React from 'react'
import {AddTray} from './AddTray'
import {Tray} from './tray/Tray'
import {Title} from '../common/Title'
import {useSelector} from 'react-redux'
import {getTrayIds} from './TraysReducer'

export function Tracking() {
  const trayIds = useSelector(getTrayIds)

  return (
    <>
      <Title>Tracking</Title>
      <AddTray/>
      {
        trayIds.map((trayId, index) => <Tray key={trayId}
                                             index={index}
                                             trayId={trayId}/>)
      }
    </>
  )
}
