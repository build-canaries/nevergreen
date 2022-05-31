import React, {ReactElement} from 'react'
import {useDispatch} from 'react-redux'
import styles from './remote-backup-card.scss'
import {RemoteLocation as RemoteLocationType} from './RemoteLocationsReducer'
import {removeBackup} from './BackupActionCreators'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {BackupLogo} from './BackupLogo'
import {Summary} from '../../common/Summary'
import {backupSummary} from './BackupSummary'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {LinkButton} from '../../common/LinkButton'
import {CloudUpload} from '../../common/icons/CloudUpload'
import {CloudDownload} from '../../common/icons/CloudDownload'
import {Cog} from '../../common/icons/Cog'

interface RemoteLocationProps {
  readonly location: RemoteLocationType;
  readonly index: number;
}

export function RemoteBackupCard({location, index}: RemoteLocationProps): ReactElement {
  const dispatch = useDispatch()

  const header = <CardHeading title={`Remote location ${index}`}
                              icon={<BackupLogo where={location.where}/>}
                              onRemove={() => dispatch(removeBackup(location.internalId))}/>

  return (
    <Card header={header}
          className={styles.card}>
      <Summary values={backupSummary(location)}/>
      <LinkButton className={styles.exportButton}
                  icon={<CloudUpload/>}
                  to={`${location.internalId}/export`}>
        Export<VisuallyHidden> remotely</VisuallyHidden>
      </LinkButton>
      <LinkButton className={styles.importButton}
                  icon={<CloudDownload/>}
                  to={`${location.internalId}/import`}>
        Import<VisuallyHidden> remote</VisuallyHidden>
      </LinkButton>
      <LinkButton className={styles.detailsButton}
                  icon={<Cog/>}
                  to={`${location.internalId}/details`}>
        Details
      </LinkButton>
    </Card>
  )
}
