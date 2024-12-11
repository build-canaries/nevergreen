import { AuthTypes, Feed } from './FeedsReducer'
import { TrackingMode } from './FeedsReducer'
import type { ReactElement } from 'react'
import { URL } from '../../common/URL'
import { Summary } from '../../common/Summary'
import { Card } from '../../common/card/Card'
import { CardHeading } from '../../common/card/CardHeading'
import { feedRemoved } from './TrackingActionCreators'
import { FeedLogo } from './FeedLogo'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import styles from './settings/update-details-page.scss'
import { Cog } from '../../common/icons/Cog'
import { LinkButton } from '../../common/LinkButton'
import { CheckboxChecked } from '../../common/icons/CheckboxChecked'
import { VisuallyHidden } from '../../common/VisuallyHidden'
import { generatePath } from 'react-router-dom'
import { RoutePaths } from '../../AppRoutes'
import { getSelectedProjectsForFeed } from './SelectedReducer'

interface FeedCardProps {
  readonly feed: Feed
}

function authTypeDisplay(authType: AuthTypes): string {
  switch (authType) {
    case AuthTypes.basic:
      return 'Basic auth'
    case AuthTypes.none:
      return 'No auth'
    case AuthTypes.token:
      return 'Access token'
    case AuthTypes.queryParam:
      return 'Query parameter'
  }
}

function trackingModeDisplay(
  trackingMode: TrackingMode,
  selected: ReadonlyArray<string>,
): string {
  switch (trackingMode) {
    case TrackingMode.everything:
      return 'Everything'
    case TrackingMode.selected:
      return `Selected |${selected.length}|`
  }
}

export function FeedCard({ feed }: FeedCardProps): ReactElement {
  const dispatch = useAppDispatch()
  const selected = useAppSelector(getSelectedProjectsForFeed(feed.trayId))

  const title = feed.name ? feed.name : 'Unnamed feed'

  const summary = [
    { label: 'URL', value: <URL url={feed.url} /> },
    { label: 'Authentication', value: authTypeDisplay(feed.authType) },
    {
      label: 'Tracking mode',
      value: trackingModeDisplay(feed.trackingMode, selected),
    },
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
      <LinkButton
        className={styles.link}
        to={generatePath(RoutePaths.trackingConnection, {
          id: feed.trayId,
        })}
        icon={<Cog />}
      >
        Update connection
        {<VisuallyHidden> for {title}</VisuallyHidden>}
      </LinkButton>
      <LinkButton
        icon={<CheckboxChecked />}
        to={generatePath(RoutePaths.trackingProjects, {
          id: feed.trayId,
        })}
      >
        Manage projects{<VisuallyHidden> for {title}</VisuallyHidden>}
      </LinkButton>
      <LinkButton
        icon={<Cog />}
        to={generatePath(RoutePaths.trackingDetails, {
          id: feed.trayId,
        })}
      >
        Update details{<VisuallyHidden> for {title}</VisuallyHidden>}
      </LinkButton>
    </Card>
  )
}
