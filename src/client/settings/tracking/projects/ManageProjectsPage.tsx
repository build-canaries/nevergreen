import React, {ReactElement} from 'react'
import {Page} from '../../../common/Page'
import {ROUTE_SETTINGS_TRACKING} from '../../../Routes'
import {AvailableProjects} from './AvailableProjects'
import {Tray} from '../../../domain/Tray'
import {CheckboxChecked} from '../../../common/icons/CheckboxChecked'
import {BackButton, UpdateFeedDetailsButton} from '../../../common/LinkButton'

interface ManageProjectsPageProps {
  readonly feed: Tray;
}

export function ManageProjectsPage({feed}: ManageProjectsPageProps): ReactElement {
  return (
    <Page title='Manage projects' icon={<CheckboxChecked/>}>
      <AvailableProjects tray={feed}/>
      <UpdateFeedDetailsButton feedId={feed.trayId} title={feed.name}/>
      <BackButton to={ROUTE_SETTINGS_TRACKING}>Back to tracking</BackButton>
    </Page>
  )
}
