import React, {ReactElement} from 'react'
import styles from './locally.scss'
import {ROUTE_EXPORT_LOCAL, ROUTE_IMPORT_LOCAL} from '../../Routes'
import {Summary} from '../../common/Summary'
import {URL} from '../../common/URL'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {LocalLogo} from './logo/LocalLogo'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import {LinkButton} from '../../common/LinkButton'
import {iFloppyDisk, iFolderOpen} from '../../common/fonts/Icons'

export function Locally(): ReactElement {
  const summary = [
    {label: 'Where', value: 'Locally'},
    {label: 'URL', value: <URL url='file://...'/>},
    {label: 'Description', value: 'Manual local backups'}
  ]

  const header = <CardHeading title='Local backups'
                              icon={<LocalLogo/>}/>

  return (
    <Card header={header}
          className={styles.card}>
      <Summary values={summary}/>
      <LinkButton className={styles.export}
                  icon={iFloppyDisk}
                  to={ROUTE_EXPORT_LOCAL}>
        Export<VisuallyHidden> locally</VisuallyHidden>
      </LinkButton>
      <LinkButton icon={iFolderOpen}
                  to={ROUTE_IMPORT_LOCAL}>
        Import<VisuallyHidden> local</VisuallyHidden>
      </LinkButton>
    </Card>
  )
}
