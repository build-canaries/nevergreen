import React, {ReactElement, useState} from 'react'
import {AddTray} from './AddTray'
import {Tray} from './Tray'
import {Title} from '../common/Title'
import {useSelector} from 'react-redux'
import {getTrays} from './TraysReducer'

export function Tracking(): ReactElement {
  const trays = useSelector(getTrays)
  const [highlightTray, setHighlightTray] = useState('')
  const [refreshTray, setRefreshTray] = useState('')

  return (
    <>
      <Title>Tracking</Title>
      <AddTray setHighlightTray={setHighlightTray}
               setRefreshTray={setRefreshTray}/>
      {
        trays.map((tray, index) => <Tray key={tray.trayId}
                                         index={index}
                                         tray={tray}
                                         highlightTray={highlightTray}
                                         refreshTray={refreshTray}/>)
      }
    </>
  )
}
