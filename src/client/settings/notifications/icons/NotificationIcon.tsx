import React, {ReactElement} from 'react'
import healthyIcon from './healthy.svg'
import unknownIcon from './unknown.svg'
import healthyBuildingIcon from './healthy-building.svg'
import sickBuildingIcon from './sick-building.svg'
import sickIcon from './sick.svg'
import errorIcon from './error.svg'
import {Prognosis} from '../../../domain/Project'
import styles from './notification-icon.scss'

export const notificationIcons = {
  [Prognosis.healthy]: healthyIcon,
  [Prognosis.unknown]: unknownIcon,
  [Prognosis.healthyBuilding]: healthyBuildingIcon,
  [Prognosis.sickBuilding]: sickBuildingIcon,
  [Prognosis.sick]: sickIcon,
  [Prognosis.error]: errorIcon
}

interface NotificationIconProps {
  readonly prognosis: Prognosis;
}

export function NotificationIcon({prognosis}: NotificationIconProps): ReactElement {
  return <img src={notificationIcons[prognosis]} alt="" className={styles.icon}/>
}
