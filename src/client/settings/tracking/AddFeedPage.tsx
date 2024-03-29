import type { ReactElement } from 'react'
import { feedAdded } from './TrackingActionCreators'
import { Page } from '../../common/Page'
import { Xml } from '../../common/icons/Xml'
import { ConnectionForm, ConnectionFormFields } from './ConnectionForm'
import { RoutePaths } from '../../AppRoutes'
import { useAppDispatch } from '../../configuration/Hooks'
import { createId } from '../../common/Utils'

export function AddFeedPage(): ReactElement {
  const dispatch = useAppDispatch()

  const onSuccess = ({
    url,
    authType,
    username,
    encryptedAuth,
  }: ConnectionFormFields): string => {
    const trayId = createId()
    dispatch(
      feedAdded({
        trayId,
        url,
        authType,
        username,
        encryptedAuth,
      }),
    )
    return `/settings/tracking/${trayId}/projects`
  }

  return (
    <Page title="Add CCTray XML feed" icon={<Xml />}>
      <ConnectionForm onSuccess={onSuccess} onCancel={RoutePaths.tracking} />
    </Page>
  )
}

export const Component = AddFeedPage
