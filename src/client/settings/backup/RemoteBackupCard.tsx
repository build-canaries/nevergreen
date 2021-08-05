import React, {ReactElement} from 'react'
import {useDispatch} from 'react-redux'
import styles from './remote-backup-card.scss'
import {Checkbox} from '../../common/forms/Checkbox'
import {RemoteLocation as RemoteLocationType} from './RemoteLocationsReducer'
import {removeBackup, setAutomaticExport} from './BackupActionCreators'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {BackupLogo} from './logo/BackupLogo'
import {Summary} from '../../common/Summary'
import {backupSummary} from './BackupSummary'
import {routeExportRemote, routeImportRemote} from '../../Routes'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {LinkButton} from '../../common/LinkButton'
import {iCloudDownload, iCloudUpload} from '../../common/fonts/Icons'

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
                  icon={iCloudUpload}
                  to={routeExportRemote(location.internalId)}>
        Export<VisuallyHidden> remotely</VisuallyHidden>
      </LinkButton>
      <LinkButton icon={iCloudDownload}
                  to={routeImportRemote(location.internalId)}>
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
