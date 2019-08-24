import React from 'react'
import {AddTray} from './AddTray'
import {Tray} from './tray/Tray'
import {Title} from '../common/Title'
import {useDispatch, useSelector} from 'react-redux'
import {getTrayIds} from './TraysReducer'
import {addTray} from './TrackingThunkActionCreators'

export function Tracking() {
  const dispatch = useDispatch()
  const trayIds = useSelector(getTrayIds)

  return (
    <>
      <Title>Tracking</Title>
      <AddTray addTray={(enteredUrl, auth) => dispatch(addTray(enteredUrl, auth))}/>
      {
        trayIds.map((trayId, index) => <Tray key={trayId}
                                             index={index}
                                             trayId={trayId}/>)
      }
    </>
  )
}
