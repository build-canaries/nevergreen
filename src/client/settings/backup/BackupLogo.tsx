import React, {ReactElement, SVGProps} from 'react'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import {GitHubLogo} from '../../common/icons/GitHubLogo'
import {GitLabLogo} from '../../common/icons/GitLabLogo'
import {JsonLogo} from '../../common/icons/JsonLogo'

interface RemoteLocationLogoProps extends SVGProps<SVGSVGElement> {
  readonly where: RemoteLocationOptions;
}

export function BackupLogo({where, ...props}: RemoteLocationLogoProps): ReactElement {
  return (
    <>
      {where === RemoteLocationOptions.gitHub && <GitHubLogo {...props}/>}
      {where === RemoteLocationOptions.gitLab && <GitLabLogo {...props}/>}
      {where === RemoteLocationOptions.custom && <JsonLogo {...props}/>}
    </>
  )
}
