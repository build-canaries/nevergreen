import React, {ReactElement} from 'react'
import {URL} from '../../common/URL'
import {Summary} from '../../common/Summary'
import {Feed} from '../../domain/Feed'
import {useDispatch, useSelector} from 'react-redux'
import {getSelectedProjectsForFeed} from './SelectedReducer'
import {getProjectsForFeed} from './ProjectsReducer'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {feedRemoved} from './TrackingActionCreators'
import {ManageFeedProjectsButton, UpdateFeedDetailsButton} from '../../common/LinkButton'
import {FeedLogo} from './FeedLogo'

interface FeedCardProps {
  readonly feed: Feed;
}

export function FeedCard({feed}: FeedCardProps): ReactElement {
  const dispatch = useDispatch()
  const selectedProjects = useSelector(getSelectedProjectsForFeed(feed.trayId))
  const allProjects = useSelector(getProjectsForFeed(feed.trayId)).filter((project) => !project.removed)

  const title = feed.name ? feed.name : 'Unnamed feed'

  const summary = [
    {label: 'Projects selected', value: `${selectedProjects.length} of ${allProjects.length}`},
    {label: 'URL', value: <URL url={feed.url}/>}
  ]

  const header = <CardHeading title={title}
                              icon={<FeedLogo feed={feed}/>}
                              onRemove={() => dispatch(feedRemoved(feed.trayId))}/>

  return (
    <Card header={header}>
      <Summary values={summary}/>
      <ManageFeedProjectsButton feedId={feed.trayId} title={title}/>
      <UpdateFeedDetailsButton feedId={feed.trayId} title={title}/>
    </Card>
  )
}
