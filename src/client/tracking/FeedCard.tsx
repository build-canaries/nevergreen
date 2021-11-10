import React, {ReactElement} from 'react'
import {isBlank} from '../common/Utils'
import {Duration} from '../common/Duration'
import {URL} from '../common/URL'
import {Summary} from '../common/Summary'
import {authTypeDisplay, serverTypeDisplay, Tray} from '../domain/Tray'
import {routeFeedDetails, routeFeedProjects} from '../Routes'
import {useDispatch, useSelector} from 'react-redux'
import {getSelectedProjectsForTray} from './SelectedReducer'
import {getProjectsForTray} from './ProjectsReducer'
import {Card} from '../common/card/Card'
import {CardHeading} from '../common/card/CardHeading'
import {trayRemoved} from './TrackingActionCreators'
import {VisuallyHidden} from '../common/VisuallyHidden'
import {LinkButton} from '../common/LinkButton'
import styles from './feed-card.scss'
import {CheckboxChecked} from '../common/icons/CheckboxChecked'
import {Cog} from '../common/icons/Cog'
import {FeedLogo} from './FeedLogo'

interface FeedCardProps {
  readonly feed: Tray;
  readonly index: number;
}

function timestamp(time: string | undefined): ReactElement | string {
  return isBlank(time) ? 'Never' : <Duration suffix='ago' timestamp={time}/>
}

export function FeedCard({feed, index}: FeedCardProps): ReactElement {
  const dispatch = useDispatch()
  const selectedProjects = useSelector(getSelectedProjectsForTray(feed.trayId))
  const allProjects = useSelector(getProjectsForTray(feed.trayId))

  const title = feed.name ? `${feed.name}` : `Feed ${index}`

  const summary = [
    {label: 'Projects selected', value: `${selectedProjects.length} of ${allProjects.length}`},
    {label: 'Last refresh', value: timestamp(feed.timestamp)},
    {label: 'URL', value: <URL url={feed.url}/>},
    {label: 'Authentication', value: authTypeDisplay(feed.authType)},
    {label: 'Server type', value: serverTypeDisplay(feed.serverType)}
  ]

  const header = <CardHeading title={title}
                              icon={<FeedLogo feed={feed}/>}
                              onRemove={() => dispatch(trayRemoved(feed.trayId))}/>

  return (
    <Card header={header}>
      <Summary values={summary}/>
      <LinkButton className={styles.manageProjects}
                  icon={<CheckboxChecked/>}
                  to={routeFeedProjects(feed.trayId)}>
        Manage projects<VisuallyHidden> for {title}</VisuallyHidden>
      </LinkButton>
      <LinkButton icon={<Cog/>}
                  to={routeFeedDetails(feed.trayId)}>
        Update details<VisuallyHidden> for {title}</VisuallyHidden>
      </LinkButton>
    </Card>
  )
}
