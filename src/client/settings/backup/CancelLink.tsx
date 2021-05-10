import {ROUTE_SETTINGS_ANCHOR_BACKUP} from '../../Routes'
import styles from './cancel-link.scss'
import {Link} from 'react-router-dom'
import React, {ReactElement} from 'react'

export function CancelLink(): ReactElement {
  return <Link to={ROUTE_SETTINGS_ANCHOR_BACKUP} className={styles.cancel}>Cancel</Link>
}
