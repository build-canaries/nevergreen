import {UntrustedData} from '../LocalRepository'
import * as MoveAudioVisualToSettings from './001_MoveAudioVisualToSettings'
import * as PrefixEncryptedValues from './002_PrefixEncryptedValues'
import * as FlattenProjects from './003_FlattenProjects'
import * as AddTrayIdToProjects from './004_AddTrayIdToProjects'
import * as SetAuthType from './005_SetAuthType'
import * as RemoveShowBrokenBuildTime from './006_RemoveShowBrokenBuildTime'

export type Migrate = (data: UntrustedData) => void

interface Migration {
  id: string;
  migrate: Migrate;
}

export function getOrderedMigrations(): ReadonlyArray<Migration> {
  return [
    MoveAudioVisualToSettings,
    PrefixEncryptedValues,
    FlattenProjects,
    AddTrayIdToProjects,
    SetAuthType,
    RemoveShowBrokenBuildTime
  ]
}
