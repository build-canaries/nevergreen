import type { ReactElement } from 'react'
import type { RemoteLocation } from './RemoteLocationsReducer'
import { getBackupLocation } from './RemoteLocationsReducer'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Navigate } from 'react-router'
import { ROUTE_BACKUP } from '../../AppRoutes'
import { useAppSelector } from '../../configuration/Hooks'

export function RemoteLocationPage(): ReactElement {
  const { internalId } = useParams()
  const location = useAppSelector(getBackupLocation(internalId ?? ''))

  if (location) {
    return <Outlet context={location} />
  } else {
    return <Navigate to={ROUTE_BACKUP} />
  }
}

export function useRemoteLocationContext(): RemoteLocation {
  return useOutletContext()
}
