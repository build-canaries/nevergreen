import React, {ReactElement} from 'react'
import styles from './locally.scss'
import {LinkButton} from '../../common/LinkButton'
import {BackupDescription} from './BackupDescription'
import {ROUTE_EXPORT_LOCAL, ROUTE_IMPORT_LOCAL} from '../../Routes'

export function Locally(): ReactElement {
  return (
    <div className={styles.location}>
      <div className={styles.header}>
        <BackupDescription/>
      </div>
      <div className={styles.body}>
        <LinkButton to={ROUTE_EXPORT_LOCAL}
                    className={styles.exportButton}>
          Export
        </LinkButton>
        <LinkButton to={ROUTE_IMPORT_LOCAL}
                    className={styles.importButton}>
          Import
        </LinkButton>
      </div>
    </div>
  )
}
