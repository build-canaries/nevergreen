import React, {ReactElement} from 'react'
import {isBlank, isNotBlank} from '../../common/Utils'
import styles from './remote-location-description.scss'
import {DEFAULT_GITHUB_URL, DEFAULT_GITLAB_URL, isCustomServer, isGitHub, isGitLab} from './RemoteLocationOptions'
import {RemoteLocation} from './RemoteLocationsReducer'
import {RemoteLocationLogo} from './RemoteLocationLogo'

const nonBreakingSpace = '\xa0'

interface RemoteLocationDescriptionProps {
  readonly location: RemoteLocation;
}

export function RemoteLocationDescription({location}: RemoteLocationDescriptionProps): ReactElement {
  const customUrl = !(location.url === DEFAULT_GITHUB_URL || location.url === DEFAULT_GITLAB_URL)

  return (
    <div className={styles.description}>
      <RemoteLocationLogo where={location.where}/>
      <div className={styles.header}>
        {(isGitHub(location) || isGitLab(location)) && (
          <>
            <p className={styles.info}>
              {isGitHub(location) && customUrl && 'GitHub Enterprise gist'}
              {isGitHub(location) && !customUrl && 'GitHub gist'}
              {isGitLab(location) && 'GitLab snippet'}
            </p>
            <p className={styles.info}>
              <code>{location.url}</code>
            </p>
            <p className={styles.info}>
              {isNotBlank(location.externalId) && <code key='external-id'>{location.externalId}</code>}
              {isBlank(location.externalId) && isNotBlank(location.description) && `"${location.description}"`}
              {isBlank(location.externalId) && isBlank(location.description) && 'No description set'}
            </p>
            <p className={styles.info}>
              {isNotBlank(location.externalId) && isNotBlank(location.description) && `"${location.description}"`}
              {(isBlank(location.externalId) || isBlank(location.description)) && nonBreakingSpace}
            </p>
          </>
        )}
        {isCustomServer(location) && (
          <>
            <p className={styles.info}>Custom server</p>
            <p className={styles.info}>
              <code>{location.url}</code>
            </p>
            <p className={styles.info}>&nbsp;</p>
            <p className={styles.info}>&nbsp;</p>
          </>
        )}
      </div>
    </div>
  )
}
