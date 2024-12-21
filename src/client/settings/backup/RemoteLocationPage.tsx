import type { ReactElement } from 'react'
import type { RemoteLocation } from './RemoteLocationsReducer'
import { getBackupLocation } from './RemoteLocationsReducer'
import { Outlet, useOutletContext, useParams } from 'react-router'
import { Navigate } from 'react-router'
import { RoutePaths } from '../../AppRoutes'
import { useAppSelector } from '../../configuration/Hooks'
import { useEffect, useState } from 'react'

export function RemoteLocationPage(): ReactElement {
  const { internalId } = useParams()
  const location = useAppSelector(getBackupLocation(internalId ?? ''))

  /*
   * We need to cache the location as importing from a remote location can
   * remove it (if it doesn't exist in the import). The re-render from changing
   * the redux state triggers before the navigation to the success page.
   * Meaning the location isn't found and this code triggered a navigation to
   * the backup page cancelling the navigation to the success page.
   */
  const [cached, setCached] = useState(location)

  useEffect(() => {
    if (location) {
      setCached(location)
    }
  }, [location])

  if (cached) {
    return <Outlet context={cached} />
  } else {
    return <Navigate to={RoutePaths.backup} />
  }
}

export function useRemoteLocationContext(): RemoteLocation {
  return useOutletContext()
}
