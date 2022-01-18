import React, {ReactElement} from 'react'
import {useSelector} from 'react-redux'
import {getTray} from './TraysReducer'
import {useParams} from 'react-router-dom'
import {Redirect, Route, Switch} from 'react-router'
import {
  ROUTE_SETTINGS_TRACKING,
  ROUTE_TRACKING_FEED_CONNECTION,
  ROUTE_TRACKING_FEED_DETAILS,
  ROUTE_TRACKING_FEED_PROJECTS
} from '../../Routes'
import {Tray} from '../../domain/Tray'
import {ManageProjectsPage} from './projects/ManageProjectsPage'
import {UpdateDetailsPage} from './settings/UpdateDetailsPage'
import {UpdateConnectionPage} from './settings/UpdateConnectionPage'

export function FeedPage(): ReactElement {
  const {id} = useParams<{ id: string }>()
  const feed = useSelector(getTray(id))

  if (feed) {
    return <FeedPageFeed feed={feed}/>
  } else {
    return <Redirect to={ROUTE_SETTINGS_TRACKING}/>
  }
}

function FeedPageFeed({feed}: { feed: Tray }): ReactElement {
  return (
    <Switch>
      <Route exact path={ROUTE_TRACKING_FEED_PROJECTS}>
        <ManageProjectsPage feed={feed}/>
      </Route>
      <Route exact path={ROUTE_TRACKING_FEED_DETAILS}>
        <UpdateDetailsPage feed={feed}/>
      </Route>
      <Route exact path={ROUTE_TRACKING_FEED_CONNECTION}>
        <UpdateConnectionPage feed={feed}/>
      </Route>
      <Route>
        <Redirect to={ROUTE_SETTINGS_TRACKING}/>
      </Route>
    </Switch>
  )
}
