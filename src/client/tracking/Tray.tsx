import React, {ReactElement, useEffect, useState} from 'react'
import {Container} from '../common/Container'
import {Tabs} from '../common/Tabs'
import {AvailableProjects} from './projects/AvailableProjects'
import {TraySettings} from './settings/TraySettings'
import {Tray as TrayType} from '../domain/Tray'

interface TrayProps {
  readonly tray: TrayType;
  readonly index: number;
  readonly highlightTray: string;
  readonly refreshTray: string;
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

export function Tray({tray, index, highlightTray, refreshTray}: TrayProps): ReactElement {
  const [requiresRefresh, setRequiresRefresh] = useState(refreshTray === tray.trayId)
  useEffect(() => {
    setRequiresRefresh((existing) => existing || refreshTray === tray.trayId)
  }, [refreshTray, tray.trayId])

  const highlight = highlightTray === tray.trayId
  const urlToShow = redactedUrl(tray.url)
  const title = tray.name || urlToShow
  const subTitle = tray.name ? urlToShow : ''

  return (
    <Container title={title}
               subTitle={subTitle}
               highlight={highlight}>
      <div data-locator='tray'>
        <Tabs titles={['Projects', 'Settings']}>
          <AvailableProjects tray={tray}
                             index={index}
                             requiresRefresh={requiresRefresh}
                             setRequiresRefresh={setRequiresRefresh}/>
          <TraySettings tray={tray}
                        setRequiresRefresh={setRequiresRefresh}/>
        </Tabs>
      </div>
    </Container>
  )
}
