import type {RemoteLocation} from './RemoteLocationsReducer'
import {removeBackup} from './RemoteLocationsReducer'
import type {ReactElement} from 'react'
import React from 'react'
import styles from './remote-backup-card.scss'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {BackupLogo} from './BackupLogo'
import {BackupSummary, where} from './BackupSummary'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {LinkButton} from '../../common/LinkButton'
import {CloudUpload} from '../../common/icons/CloudUpload'
import {CloudDownload} from '../../common/icons/CloudDownload'
import {Cog} from '../../common/icons/Cog'
import {useAppDispatch} from '../../configuration/Hooks'

interface RemoteLocationProps {
  readonly location: RemoteLocation;
}

export function RemoteBackupCard({location}: RemoteLocationProps): ReactElement {
  const dispatch = useAppDispatch()

  const locationWhere = where(location)
  const title = <>Remote<VisuallyHidden> {locationWhere}</VisuallyHidden> location</>
  const header = <CardHeading title={title}
                              icon={<BackupLogo where={location.where}/>}
                              onRemove={() => dispatch(removeBackup(location.internalId))}/>

  return (
    <Card header={header}
          className={styles.card}>
      <BackupSummary location={location}/>
      <LinkButton className={styles.exportButton}
                  icon={<CloudUpload/>}
                  to={`${location.internalId}/export`}>
        Export<VisuallyHidden> remotely to {locationWhere}</VisuallyHidden>
      </LinkButton>
      <LinkButton className={styles.importButton}
                  icon={<CloudDownload/>}
                  to={`${location.internalId}/import`}>
        Import<VisuallyHidden> remote from {locationWhere}</VisuallyHidden>
      </LinkButton>
      <LinkButton className={styles.detailsButton}
                  icon={<Cog/>}
                  to={`${location.internalId}/details`}>
        Details<VisuallyHidden> of {locationWhere}</VisuallyHidden>
      </LinkButton>
    </Card>
  )
}
