import React, {ReactElement} from 'react'
import {Summary} from '../../common/Summary'
import {useDispatch} from 'react-redux'
import {Card} from '../../common/card/Card'
import {CardHeading} from '../../common/card/CardHeading'
import {Prognosis, prognosisDisplay} from '../../domain/Project'
import {removeNotification} from './NotificationsActionCreators'
import {NotificationDetails} from './NotificationsReducer'
import {Cross} from '../../common/icons/Cross'
import {Checkmark} from '../../common/icons/Checkmark'
import styles from './notifications-card.scss'
import {isBlank} from '../../common/Utils'
import {Note} from '../../common/icons/Note'
import {URL} from '../../common/URL'
import {NotificationIcon} from './icons/NotificationIcon'
import capitalize from 'lodash/capitalize'

interface NotificationCardProps {
  readonly prognosis: Prognosis;
  readonly notification: NotificationDetails;
}

export function NotificationCard({prognosis, notification}: NotificationCardProps): ReactElement {
  const dispatch = useDispatch()

  const systemNotificationSummary = notification.systemNotification
    ? <><Checkmark className={styles.yes}/>Yes</>
    : <><Cross className={styles.no}/>No</>
  const sfxSummary = isBlank(notification.sfx)
    ? <><Cross className={styles.no}/>No</>
    : <><Note/><URL url={notification.sfx} base={document.baseURI}/></>

  const summary = [
    {label: 'Show system notification', value: systemNotificationSummary},
    {label: 'Play audio', value: sfxSummary}
  ]

  const header = <CardHeading title={`${capitalize(prognosisDisplay(prognosis))} notification`}
                              onRemove={() => dispatch(removeNotification(prognosis))}
                              icon={<NotificationIcon prognosis={prognosis}/>}/>

  return (
    <Card header={header}>
      <Summary values={summary}/>
    </Card>
  )
}
