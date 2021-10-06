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
import {List} from '../common/icons/List'

interface FeedCardProps {
  readonly tray: Tray;
  readonly index: number;
}

function timestamp(time: string | undefined): ReactElement | string {
  return isBlank(time) ? 'Never' : <Duration suffix='ago' timestamp={time}/>
}

export function FeedCard({tray, index}: FeedCardProps): ReactElement {
  const dispatch = useDispatch()
  const selectedProjects = useSelector(getSelectedProjectsForTray(tray.trayId))
  const allProjects = useSelector(getProjectsForTray(tray.trayId))

  const title = tray.name ? `${tray.name}` : `Feed ${index}`

  const summary = [
    {label: 'Projects selected', value: `${selectedProjects.length} of ${allProjects.length}`},
    {label: 'Last refresh', value: timestamp(tray.timestamp)},
    {label: 'URL', value: <URL url={tray.url}/>},
    {label: 'Auth', value: authTypeDisplay(tray.authType)},
    {label: 'Server type', value: serverTypeDisplay(tray.serverType)}
  ]

  const header = <CardHeading title={title}
                              icon={<List/>}
                              onRemove={() => dispatch(trayRemoved(tray.trayId))}/>

  return (
    <Card header={header}>
      <Summary values={summary}/>
      <LinkButton className={styles.manageProjects}
                  icon={<CheckboxChecked/>}
                  to={routeFeedProjects(tray.trayId)}>
        Manage projects<VisuallyHidden> for {title}</VisuallyHidden>
      </LinkButton>
      <LinkButton icon={<Cog/>}
                  to={routeFeedDetails(tray.trayId)}>
        Change details<VisuallyHidden> for {title}</VisuallyHidden>
      </LinkButton>
    </Card>
  )
}
