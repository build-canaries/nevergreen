import React, {ReactElement} from 'react'
import styles from './local-backup-card.scss'
import {ROUTE_EXPORT_LOCAL, ROUTE_IMPORT_LOCAL} from '../../Routes'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {LinkButton} from '../../common/LinkButton'
import {FloppyDisk} from '../../common/icons/FloppyDisk'
import {FolderOpen} from '../../common/icons/FolderOpen'

export function LocalBackupCard(): ReactElement {
  const header = <CardHeading title='Backup locally to a file'/>

  return (
    <Card header={header}>
      <LinkButton className={styles.export}
                  icon={<FloppyDisk/>}
                  to={ROUTE_EXPORT_LOCAL}>
        Export<VisuallyHidden> locally</VisuallyHidden>
      </LinkButton>
      <LinkButton icon={<FolderOpen/>}
                  to={ROUTE_IMPORT_LOCAL}>
        Import<VisuallyHidden> local</VisuallyHidden>
      </LinkButton>
    </Card>
  )
}
