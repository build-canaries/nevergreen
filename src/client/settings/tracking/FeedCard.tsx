import type { Feed } from './FeedsReducer'
import { TrackingMode } from './FeedsReducer'
import type { ReactElement } from 'react'
import { URL } from '../../common/URL'
import { Summary } from '../../common/Summary'
import { Card } from '../../common/card/Card'
import { CardHeading } from '../../common/card/CardHeading'
import { feedRemoved } from './TrackingActionCreators'
import {
  ManageFeedProjectsButton,
  UpdateFeedDetailsButton,
} from '../../common/LinkButton'
import { FeedLogo } from './FeedLogo'
import { useAppDispatch } from '../../configuration/Hooks'

interface FeedCardProps {
  readonly feed: Feed
}

function trackingModeDisplay(trackingMode: TrackingMode): string {
  switch (trackingMode) {
    case TrackingMode.everything:
      return 'Everything'
    case TrackingMode.selected:
      return 'Selected'
  }
}

export function FeedCard({ feed }: FeedCardProps): ReactElement {
  const dispatch = useAppDispatch()

  const title = feed.name ? feed.name : 'Unnamed feed'

  const summary = [
    { label: 'URL', value: <URL url={feed.url} /> },
    { label: 'Tracking mode', value: trackingModeDisplay(feed.trackingMode) },
  ]

  const header = (
    <CardHeading
      title={title}
      icon={<FeedLogo feed={feed} />}
      onRemove={() => dispatch(feedRemoved(feed.trayId))}
    />
  )

  return (
    <Card header={header}>
      <Summary values={summary} />
      <ManageFeedProjectsButton feedId={feed.trayId} title={title} />
      <UpdateFeedDetailsButton feedId={feed.trayId} title={title} />
    </Card>
  )
}
