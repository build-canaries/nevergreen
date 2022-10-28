import React, {ReactElement} from 'react'
import {useSelector} from 'react-redux'
import {RemoteBackupCard} from './RemoteBackupCard'
import {getBackupLocations} from './RemoteLocationsReducer'
import {LocalBackupCard} from './LocalBackupCard'
import {AddButton} from '../../common/LinkButton'
import {Page} from '../../common/Page'
import {FloppyDisk} from '../../common/icons/FloppyDisk'
import {CardList} from '../../common/card/CardList'

export function BackupPage(): ReactElement {
  const backupLocations = useSelector(getBackupLocations)

  return (
    <Page title="Backup settings" icon={<FloppyDisk/>}>
      <LocalBackupCard/>
      <AddButton>Add remote location</AddButton>
      <CardList>
        {Object.values(backupLocations).map((backupLocation) => {
          return (
            <RemoteBackupCard key={backupLocation.internalId} location={backupLocation}/>
          )
        })}
      </CardList>
    </Page>
  )
}
