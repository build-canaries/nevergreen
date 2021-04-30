import React, {ReactElement, ReactNode} from 'react'
import styles from './export-page.scss'
import {BackupDescription} from '../BackupDescription'
import {Page} from '../../../common/Page'
import {RemoteLocation} from '../RemoteLocationsReducer'

interface ExportPageProps {
  readonly title: string;
  readonly children: ReactNode;
  readonly location?: RemoteLocation;
}

export function ExportPage({title, children, location}: ExportPageProps): ReactElement {
  return (
    <Page title={title}>
      <div className={styles.header}>
        <BackupDescription location={location}/>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </Page>
  )
}
