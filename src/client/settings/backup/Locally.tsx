import React, {ReactElement} from 'react'
import styles from './locally.scss'
import {ROUTE_EXPORT_LOCAL, ROUTE_IMPORT_LOCAL} from '../../Routes'
import {Summary} from '../../common/Summary'
import {URL} from '../../common/URL'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {LinkButton} from '../../common/LinkButton'
import {FloppyDisk} from '../../common/icons/FloppyDisk'
import {FolderOpen} from '../../common/icons/FolderOpen'

export function Locally(): ReactElement {
  const summary = [
    {label: 'Where', value: 'Locally'},
    {label: 'URL', value: <URL url='file://...'/>},
    {label: 'Description', value: 'Manual local backups'}
  ]

  const header = <CardHeading title='Local backups'/>

  return (
    <Card header={header}
          className={styles.card}>
      <Summary values={summary}/>
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
