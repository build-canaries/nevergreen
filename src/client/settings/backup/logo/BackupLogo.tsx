import React, {ReactElement} from 'react'
import isNil from 'lodash/isNil'
import {RemoteLocationOptions} from '../RemoteLocationOptions'
import styles from './backup-logo.scss'
import GitHubLogo from './github-logo.svg'
import GitLabLogo from './gitlab-logo.svg'
import JsonLogo from './json-logo.svg'
import LocalLogo from './local-logo.svg'

interface RemoteLocationLogoProps {
  readonly where?: RemoteLocationOptions;
}

export function BackupLogo({where}: RemoteLocationLogoProps): ReactElement {
  return (
    <>
      {isNil(where) && <img className={styles.logo} src={LocalLogo} alt='' aria-hidden/>}
      {where === RemoteLocationOptions.GitHub && <img className={styles.logo} src={GitHubLogo} alt='' aria-hidden/>}
      {where === RemoteLocationOptions.GitLab && <img className={styles.logo} src={GitLabLogo} alt='' aria-hidden/>}
      {where === RemoteLocationOptions.Custom && <img className={styles.logo} src={JsonLogo} alt='' aria-hidden/>}
    </>
  )
}
