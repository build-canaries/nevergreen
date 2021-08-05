import React, {ReactElement, SVGProps} from 'react'
import {RemoteLocationOptions} from '../RemoteLocationOptions'
import {GitHubLogo} from './GitHubLogo'
import {GitLabLogo} from './GitLabLogo'
import {JsonLogo} from './JsonLogo'

interface RemoteLocationLogoProps extends SVGProps<SVGSVGElement> {
  readonly where: RemoteLocationOptions;
}

export function BackupLogo({where, ...props}: RemoteLocationLogoProps): ReactElement {
  return (
    <>
      {where === RemoteLocationOptions.GitHub && <GitHubLogo {...props}/>}
      {where === RemoteLocationOptions.GitLab && <GitLabLogo {...props}/>}
      {where === RemoteLocationOptions.Custom && <JsonLogo {...props}/>}
    </>
  )
}
