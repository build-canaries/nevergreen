import type { ReactElement } from 'react'
import { Card } from '../../common/card/Card'
import { CardHeading } from '../../common/card/CardHeading'
import { VisuallyHidden } from '../../common/VisuallyHidden'
import { LinkButton } from '../../common/LinkButton'
import { FloppyDisk } from '../../common/icons/FloppyDisk'
import { FolderOpen } from '../../common/icons/FolderOpen'
import styles from './local-backup-card.scss'

export function LocalBackupCard(): ReactElement {
  const header = <CardHeading title="Backup locally to a file" />

  return (
    <Card header={header}>
      <LinkButton
        className={styles.export}
        icon={<FloppyDisk />}
        to="local/export"
      >
        Export<VisuallyHidden> locally</VisuallyHidden>
      </LinkButton>
      <LinkButton
        className={styles.import}
        icon={<FolderOpen />}
        to="local/import"
      >
        Import<VisuallyHidden> local</VisuallyHidden>
      </LinkButton>
    </Card>
  )
}
