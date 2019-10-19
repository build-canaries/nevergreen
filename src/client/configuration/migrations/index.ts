import {Migration} from '../Migrate'
import * as m01 from './20191002205123_MoveAudioVisualToSettings'
import * as m02 from './20191016201731_PrefixEncryptedValues'
import * as m03 from './20191017123204_FlattenProjects'
import * as m04 from './20191017183324_AddTrayIdToProjects'

interface Migrations {
  readonly [id: string]: Migration;
}

export function getMigrations(): Migrations {
  return {
    [m01.id]: m01.migrate,
    [m02.id]: m02.migrate,
    [m03.id]: m03.migrate,
    [m04.id]: m04.migrate
  }
}
