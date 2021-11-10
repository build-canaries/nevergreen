import React, {ReactElement} from 'react'
import {Page} from '../../common/Page'
import {Link} from 'react-router-dom'
import {ROUTE_SETTINGS_TRACKING} from '../../Routes'
import {AvailableProjects} from './AvailableProjects'
import styles from './manage-projects-page.scss'
import {Tray} from '../../domain/Tray'
import {CheckboxChecked} from '../../common/icons/CheckboxChecked'

interface ManageProjectsPageProps {
  readonly feed: Tray;
}

export function ManageProjectsPage({feed}: ManageProjectsPageProps): ReactElement {
  return (
    <Page title='Manage projects' icon={<CheckboxChecked/>}>
      <AvailableProjects tray={feed}/>
      <Link to={ROUTE_SETTINGS_TRACKING} className={styles.link}>Back to tracking</Link>
    </Page>
  )
}
