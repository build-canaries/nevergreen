import type { ReactElement } from 'react'
import { getNotifications } from './NotificationsReducer'
import { Prognosis } from '../../domain/Project'
import { NotificationCard } from './NotificationCard'
import { WarningMessages } from '../../common/Messages'
import { CardList } from '../../common/card/CardList'
import { useAppSelector } from '../../configuration/Hooks'
import { AddLink } from '../AddLink'

export function Notifications(): ReactElement {
  const notifications = useAppSelector(getNotifications)
  const entries = Object.entries(notifications)

  return (
    <>
      <AddLink>Add notification</AddLink>
      {entries.length === 0 && (
        <WarningMessages messages="No notifications added" />
      )}
      <CardList>
        {entries.map(([prognosis, notification]) => {
          return (
            <NotificationCard
              key={prognosis}
              prognosis={prognosis as Prognosis}
              notification={notification}
            />
          )
        })}
      </CardList>
    </>
  )
}
