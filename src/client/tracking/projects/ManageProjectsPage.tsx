import React, {ReactElement} from 'react'
import {Page} from '../../common/Page'
import {Link} from 'react-router-dom'
import {ROUTE_SETTINGS_TRACKING, routeFeedDetails} from '../../Routes'
import {AvailableProjects} from './AvailableProjects'
import styles from './manage-projects-page.scss'
import {Tray} from '../../domain/Tray'
import {LinkButton} from '../../common/LinkButton'
import {Cog} from '../../common/icons/Cog'

interface ManageProjectsPageProps {
  readonly feed: Tray;
}

export function ManageProjectsPage({feed}: ManageProjectsPageProps): ReactElement {
  return (
    <Page title='Manage projects'>
      <AvailableProjects tray={feed}/>
      <LinkButton to={routeFeedDetails(feed.trayId)}
                  className={styles.link}
                  icon={<Cog/>}>
        Change details
      </LinkButton>
      <Link to={ROUTE_SETTINGS_TRACKING} className={styles.link}>Back to tracking</Link>
    </Page>
  )
}
