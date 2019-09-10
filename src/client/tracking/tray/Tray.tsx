import React from 'react'
import {Container} from '../../common/Container'
import {Loading} from '../../common/Loading'
import {Tabs} from '../../common/Tabs'
import {useDispatch, useSelector} from 'react-redux'
import {getTrayHighlight, getTrayLoaded, getTrayName, getTrayUrl} from '../TraysReducer'
import {checkRefresh} from '../TrackingThunkActionCreators'
import {AvailableProjects} from '../projects/AvailableProjects'
import {TraySettings} from '../settings/TraySettings'

interface TrayProps {
  readonly trayId: string;
  readonly index: number;
}

const REDACTED = '*****'

function redactedUrl(url: string) {
  try {
    const redactedUrl = new URL(url)
    if (redactedUrl.password) {
      redactedUrl.password = REDACTED
    }
    const searchParams = redactedUrl.searchParams
    if (searchParams) {
      for (const key of searchParams.keys()) {
        searchParams.set(key, REDACTED)
      }
    }
    return redactedUrl.toString()
  } catch (e) {
    return ''
  }
}

export function Tray({trayId, index}: TrayProps) {
  const dispatch = useDispatch()
  const loaded = useSelector(getTrayLoaded(trayId))
  const name = useSelector(getTrayName(trayId))
  const url = useSelector(getTrayUrl(trayId))
  const highlight = useSelector(getTrayHighlight(trayId))

  const urlToShow = redactedUrl(url)
  const title = name || urlToShow
  const subTitle = name ? urlToShow : ''

  return (
    <Container title={title}
               subTitle={subTitle}
               highlight={highlight}>
      <div data-locator='tray'>
        <Tabs titles={['projects', 'settings']}
              onSwitch={() => dispatch(checkRefresh(trayId))}>
          <Loading loaded={loaded}>
            <AvailableProjects trayId={trayId}
                               index={index}/>
          </Loading>
          <TraySettings trayId={trayId}/>
        </Tabs>
      </div>
    </Container>
  )
}
