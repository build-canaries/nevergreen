import React, {ReactElement} from 'react'
import {useDispatch} from 'react-redux'
import styles from './remote-backup-card.scss'
import {Checkbox} from '../../common/forms/Checkbox'
import {RemoteLocation as RemoteLocationType} from './RemoteLocationsReducer'
import {removeBackup, setAutomaticExport} from './BackupActionCreators'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {BackupLogo} from './BackupLogo'
import {Summary} from '../../common/Summary'
import {backupSummary} from './BackupSummary'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {LinkButton} from '../../common/LinkButton'
import {CloudUpload} from '../../common/icons/CloudUpload'
import {CloudDownload} from '../../common/icons/CloudDownload'

interface RemoteLocationProps {
  readonly location: RemoteLocationType;
  readonly index: number;
}

export function RemoteBackupCard({location, index}: RemoteLocationProps): ReactElement {
  const dispatch = useDispatch()

  const header = <CardHeading title={`Remote backup ${index}`}
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
      <LinkButton icon={<CloudDownload/>}
                  to={`${location.internalId}/import`}>
        Import<VisuallyHidden> remote</VisuallyHidden>
      </LinkButton>
      <Checkbox onToggle={(value) => dispatch(setAutomaticExport(location.internalId, value))}
                checked={location.automaticallyExport}
                className={styles.autoExport}>
        Automatically export
      </Checkbox>
    </Card>
  )
}
