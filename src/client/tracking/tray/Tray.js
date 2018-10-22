import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../../common/container/Container'
import AvailableProjectsContainer from '../projects/AvailableProjectsContainer'
import TraySettingsContainer from '../settings/TraySettingsContainer'
import {Loading} from '../../common/loading/Loading'
import {Tabs} from '../../common/tabs/Tabs'

const REDACTED = '*****'

function redactedUrl(url) {
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

export function Tray({url, name, highlight, loaded, trayId, index}) {
  const urlToShow = redactedUrl(url)
  const title = name || urlToShow
  const subTitle = name ? urlToShow : ''

  return (
    <Container title={title} subTitle={subTitle} highlight={highlight}>
      <div data-locator='tray'>
        <Tabs titles={['projects', 'settings']}>
          <Loading loaded={loaded}>
            <AvailableProjectsContainer trayId={trayId} index={index}/>
          </Loading>
          <TraySettingsContainer trayId={trayId}/>
        </Tabs>
      </div>
    </Container>
  )
}

Tray.propTypes = {
  trayId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  loaded: PropTypes.bool,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  highlight: PropTypes.bool
}
