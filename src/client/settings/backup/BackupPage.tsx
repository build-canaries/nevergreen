import type { ReactElement } from 'react'
import { RemoteBackupCard } from './RemoteBackupCard'
import { getBackupLocations } from './RemoteLocationsReducer'
import { LocalBackupCard } from './LocalBackupCard'
import { AddButton } from '../../common/LinkButton'
import { Page } from '../../common/Page'
import { FloppyDisk } from '../../common/icons/FloppyDisk'
import { CardList } from '../../common/card/CardList'
import { useAppSelector } from '../../configuration/Hooks'

export function BackupPage(): ReactElement {
  const backupLocations = useAppSelector(getBackupLocations)

  return (
    <Page title="Backup settings" icon={<FloppyDisk />}>
      <LocalBackupCard />
      <AddButton>Add remote location</AddButton>
      <CardList>
        {Object.values(backupLocations).map((backupLocation) => {
          return (
            <RemoteBackupCard
              key={backupLocation.internalId}
              location={backupLocation}
            />
          )
        })}
      </CardList>
    </Page>
  )
}

export const Component = BackupPage
