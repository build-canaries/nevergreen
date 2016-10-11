import {migrate as ZeroPointElevenPointZero} from './migrations/0.11.0'

const migrations = [ZeroPointElevenPointZero]

export function migrate(data) {
  return migrations.reduce((reduction, migration) => {
    return migration(reduction)
  }, data)
}
