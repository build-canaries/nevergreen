import React, {ReactElement} from 'react'
import {Page} from '../../../common/Page'
import {AvailableProjects} from './AvailableProjects'
import {CheckboxChecked} from '../../../common/icons/CheckboxChecked'
import {UpdateFeedDetailsButton} from '../../../common/LinkButton'
import {useFeedContext} from '../FeedPage'

export function ManageProjectsPage(): ReactElement {
  const feed = useFeedContext()

  return (
    <Page title='Manage projects' icon={<CheckboxChecked/>}>
      <AvailableProjects feed={feed}/>
      <UpdateFeedDetailsButton feedId={feed.trayId} title={feed.name}/>
    </Page>
  )
}
