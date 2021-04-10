import React, {ReactElement} from 'react'
import {isBlank, isNotBlank} from '../../common/Utils'
import isNil from 'lodash/isNil'
import styles from './backup-description.scss'
import {DEFAULT_GITHUB_URL, DEFAULT_GITLAB_URL, isCustomServer, isGitHub, isGitLab} from './RemoteLocationOptions'
import {RemoteLocation} from './RemoteLocationsReducer'
import {BackupLogo} from './logo/BackupLogo'
import {Duration} from '../../common/Duration'

interface BackupDescriptionProps {
  readonly location?: RemoteLocation;
}

function LastImportExport({location}: { location: RemoteLocation }): ReactElement {
  return (
    <>
      <p className={styles.info}>
        {isBlank(location.exportTimestamp) && 'Never exported'}
        {isNotBlank(location.exportTimestamp) && (
          <Duration prefix='Last export'
                    suffix='ago'
                    timestamp={location.exportTimestamp}/>
        )}
      </p>
      <p className={styles.info}>
        {isBlank(location.importTimestamp) && 'Never imported'}
        {isNotBlank(location.importTimestamp) && (
          <Duration prefix='Last import'
                    suffix='ago'
                    timestamp={location.importTimestamp}/>
        )}
      </p>
    </>
  )
}

export function BackupDescription({location}: BackupDescriptionProps): ReactElement {
  const customUrl = !(location?.url === DEFAULT_GITHUB_URL || location?.url === DEFAULT_GITLAB_URL)

  return (
    <div className={styles.description}>
      <BackupLogo where={location?.where}/>
      <div className={styles.header}>
        {isNil(location) && (
          <>
            <p className={styles.info}>Locally</p>
            <p className={styles.info}>
              <code>file://...</code>
            </p>
            <p className={styles.info}>&quot;Manual local backups&quot;</p>
          </>
        )}
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
            </p>
            <LastImportExport location={location}/>
          </>
        )}
        {isCustomServer(location) && (
          <>
            <p className={styles.info}>Custom server</p>
            <p className={styles.info}>
              <code>{location.url}</code>
            </p>
            <LastImportExport location={location}/>
          </>
        )}
      </div>
    </div>
  )
}
