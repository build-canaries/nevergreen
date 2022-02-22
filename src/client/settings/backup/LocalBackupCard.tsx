import React, {ReactElement} from 'react'
import styles from './local-backup-card.scss'
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
                  to='local/export'>
        Export<VisuallyHidden> locally</VisuallyHidden>
      </LinkButton>
      <LinkButton icon={<FolderOpen/>}
                  to='local/import'>
        Import<VisuallyHidden> local</VisuallyHidden>
      </LinkButton>
    </Card>
  )
}
