import React, {ReactElement} from 'react'
import styles from './remote-location-logo.scss'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import GitHubLogo from './github-logo.svg'
import GitLabLogo from './gitlab-logo.svg'
import JsonLogo from './json-logo.svg'

interface RemoteLocationLogoProps {
  readonly where: RemoteLocationOptions;
}

export function RemoteLocationLogo({where}: RemoteLocationLogoProps): ReactElement {
  return (
    <>
      {where === RemoteLocationOptions.GitHub && <img className={styles.logo} src={GitHubLogo} alt='' aria-hidden/>}
      {where === RemoteLocationOptions.GitLab && <img className={styles.logo} src={GitLabLogo} alt='' aria-hidden/>}
      {where === RemoteLocationOptions.Custom && <img className={styles.logo} src={JsonLogo} alt='' aria-hidden/>}
    </>
  )
}
