import type { ReactElement } from 'react'
import type { Feed } from './FeedsReducer'
import { getFeed } from './FeedsReducer'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { RoutePaths } from '../../AppRoutes'
import { useAppSelector } from '../../configuration/Hooks'

export function FeedPage(): ReactElement {
  const { id } = useParams()
  const feed = useAppSelector(getFeed(id ?? ''))

  if (feed) {
    return <Outlet context={feed} />
  } else {
    return <Navigate to={RoutePaths.tracking} />
  }
}

export function useFeedContext(): Feed {
  return useOutletContext()
}
