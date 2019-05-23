import React from 'react'
import {Container} from '../../common/Container'
import AvailableProjectsContainer from '../projects/AvailableProjectsContainer'
import TraySettingsContainer from '../settings/TraySettingsContainer'
import {Loading} from '../../common/Loading'
import {Tabs} from '../../common/Tabs'

interface TrayProps {
  trayId: string;
  index: number;
  loaded?: boolean;
  name?: string;
  url: string;
  highlight?: boolean;
  checkRefresh: (trayId: string) => void;
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

export function Tray({url, name, highlight, loaded, trayId, index, checkRefresh}: TrayProps) {
  const urlToShow = redactedUrl(url)
  const title = name || urlToShow
  const subTitle = name ? urlToShow : ''

  return (
    <Container title={title} subTitle={subTitle} highlight={highlight}>
      <div data-locator='tray'>
        <Tabs titles={['projects', 'settings']} onSwitch={() => checkRefresh(trayId)}>
          <Loading loaded={loaded}>
            <AvailableProjectsContainer trayId={trayId} index={index}/>
          </Loading>
          <TraySettingsContainer trayId={trayId}/>
        </Tabs>
      </div>
    </Container>
  )
}
