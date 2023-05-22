import type { ReactElement } from 'react'
import { Page } from '../../../common/Page'
import { Checkmark } from '../../../common/icons/Checkmark'
import { InfoMessages } from '../../../common/Messages'
import { usePreImportConfigurationContext } from './ImportPage'
import { useAppSelector } from '../../../configuration/Hooks'
import difference from 'lodash/difference'
import styles from './import-success-page.scss'

export function ImportSuccessPage(): ReactElement {
  const preImport = usePreImportConfigurationContext()
  const currentState = useAppSelector((state) => state)

  const preImportFeedIds = Object.keys(preImport.trays ?? {})
  const currentFeedIds = Object.keys(currentState.trays)
  const addedFeeds = difference(currentFeedIds, preImportFeedIds)
  const removedFeeds = difference(preImportFeedIds, currentFeedIds)

  const preImportSuccess = preImport.success?.messages ?? []
  const currentSuccess = currentState.success.messages
  const addedSuccess = difference(currentSuccess, preImportSuccess)
  const removedSuccess = difference(preImportSuccess, currentSuccess)

  const preImportNotifications = Object.keys(
    preImport.notifications?.notifications ?? {}
  )
  const currentNotifications = Object.keys(
    currentState.notifications.notifications
  )
  const addedNotifications = difference(
    currentNotifications,
    preImportNotifications
  )
  const removedNotifications = difference(
    preImportNotifications,
    currentNotifications
  )

  const preImportBackupIds = Object.keys(preImport.backupRemoteLocations ?? {})
  const currentBackupIds = Object.keys(currentState.backupRemoteLocations)
  const addedBackups = difference(currentBackupIds, preImportBackupIds)
  const removedBackups = difference(preImportBackupIds, currentBackupIds)

  return (
    <Page title="Import successful" icon={<Checkmark />}>
      <InfoMessages messages="Successfully imported configuration" />
      <table>
        <thead>
          <tr>
            <th scope="col" className={styles.header}>
              Feature
            </th>
            <th scope="col" className={styles.header}>
              Added
            </th>
            <th scope="col" className={styles.header}>
              Removed
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Feeds</td>
            <td className={styles.number}>{addedFeeds.length.toString()}</td>
            <td className={styles.number}>{removedFeeds.length.toString()}</td>
          </tr>
          <tr>
            <td>Success messages</td>
            <td className={styles.number}>{addedSuccess.length.toString()}</td>
            <td className={styles.number}>
              {removedSuccess.length.toString()}
            </td>
          </tr>
          <tr>
            <td>Notifications</td>
            <td className={styles.number}>
              {addedNotifications.length.toString()}
            </td>
            <td className={styles.number}>
              {removedNotifications.length.toString()}
            </td>
          </tr>
          <tr>
            <td>Backup remote locations</td>
            <td className={styles.number}>{addedBackups.length.toString()}</td>
            <td className={styles.number}>
              {removedBackups.length.toString()}
            </td>
          </tr>
        </tbody>
      </table>
    </Page>
  )
}
