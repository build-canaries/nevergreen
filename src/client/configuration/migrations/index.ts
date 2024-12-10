import { UntrustedData } from '../LocalRepository'
import * as MoveAudioVisualToSettings from './001_MoveAudioVisualToSettings'
import * as PrefixEncryptedValues from './002_PrefixEncryptedValues'
import * as FlattenProjects from './003_FlattenProjects'
import * as AddTrayIdToProjects from './004_AddTrayIdToProjects'
import * as SetAuthType from './005_SetAuthType'
import * as RemoveShowBrokenBuildTime from './006_RemoveShowBrokenBuildTime'
import * as SetProjectDescription from './007_SetProjectDescription'
import * as UpdateMaxProjectsToShow from './008_UpdateMaxProjectsToShow'
import * as RemoveProjects from './009_RemoveProjects'
import * as SetTrackingMode from './010_SetTrackingMode'
import * as RemoveOldKeys from './011_RemoveOldKeys'
import * as MoveNotificationSettings from './012_MoveNotificationSettings'
import * as MigrateNotifications from './013_MigrateNotifications'
import * as MigratePersonalSettings from './014_MigratePersonalSettings'
import * as MigrateRemoteLocationTimestamps from './015_MigrateRemoteLocationTimestamps'
import * as MigrateSuccess from './016_MigrateSuccess'
import * as MoveClickToShowMenuSetting from './017_MoveClickToShowMenuSetting'
import * as CombineFeedAuthSettings from './018_CombineFeedAuthSettings'
import * as MigratePrognosisSettings from './019_MigratePrognosisSettings'

export type Migrate = (data: UntrustedData) => void

interface Migration {
  id: string
  migrate: Migrate
}

export function getOrderedMigrations(): ReadonlyArray<Migration> {
  return [
    MoveAudioVisualToSettings,
    PrefixEncryptedValues,
    FlattenProjects,
    AddTrayIdToProjects,
    SetAuthType,
    RemoveShowBrokenBuildTime,
    SetProjectDescription,
    UpdateMaxProjectsToShow,
    RemoveProjects,
    SetTrackingMode,
    RemoveOldKeys,
    MoveNotificationSettings,
    MigrateNotifications,
    MigratePersonalSettings,
    MigrateRemoteLocationTimestamps,
    MigrateSuccess,
    MoveClickToShowMenuSetting,
    CombineFeedAuthSettings,
    MigratePrognosisSettings,
  ]
}
