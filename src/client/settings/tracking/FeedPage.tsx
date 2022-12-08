import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { getFeed } from './FeedsReducer'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Feed } from '../../domain/Feed'
import { ROUTE_TRACKING } from '../../AppRoutes'

export function FeedPage(): ReactElement {
  const { id } = useParams()
  const feed = useSelector(getFeed(id || ''))

  if (feed) {
    return <Outlet context={feed} />
  } else {
    return <Navigate to={ROUTE_TRACKING} />
  }
}

export function useFeedContext(): Feed {
  return useOutletContext()
}
