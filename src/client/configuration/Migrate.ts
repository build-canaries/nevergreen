import format from 'date-fns/format'
import {info} from '../common/Logger'
import {UntrustedData} from './LocalRepository'
import {get, has, isArray, isNil, isObject, set, unset} from 'lodash'
import {APPLIED_MIGRATIONS_ROOT, AppliedMigration} from './MigrationsReducer'
import {getOrderedMigrations} from './migrations'

type PropertyPath = string | ReadonlyArray<string>

export function migrate(data: UntrustedData): void {
  if (!has(data, APPLIED_MIGRATIONS_ROOT)) {
    data[APPLIED_MIGRATIONS_ROOT] = []
  }

  const appliedMigrations = data[APPLIED_MIGRATIONS_ROOT] as AppliedMigration[]

  getOrderedMigrations().forEach((migration) => {
    info(`Checking if migration [${migration.id}] has been applied...`)

    const appliedMigration = appliedMigrations.find((m) => m.id === migration.id)

    if (isNil(appliedMigration)) {
      info(`Migration [${migration.id}] not yet applied!`)

      migration.migrate(data)

      const timestamp = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX')
      appliedMigrations.push({id: migration.id, timestamp})

      info(`Migration [${migration.id}] successfully applied at ${timestamp}`)
    } else {
      info(`Migration [${migration.id}] already applied on ${appliedMigration.timestamp}`)
    }
  })
}

export function moveData(untrustedData: UntrustedData, fromPath: PropertyPath, toPath: PropertyPath): void {
  if (has(untrustedData, fromPath)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataToMove = get(untrustedData, fromPath)
    set(untrustedData, toPath, dataToMove)
    unset(untrustedData, fromPath)
  }
}

function forEachAt(untrustedData: UntrustedData, atPath: PropertyPath, callback: (value: UntrustedData, key: string) => void): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const o = get(untrustedData, atPath)
  if (isObject(o)) {
    Object.entries(o).forEach(([key, value]) => {
      callback(value as UntrustedData, key)
    })
  }
}

export function forEachObjectAt(untrustedData: UntrustedData, atPath: PropertyPath, callback: (value: UntrustedData, key: string) => void): void {
  forEachAt(untrustedData, atPath, (value, key) => {
    if (isObject(value)) {
      callback(value, key)
    }
  })
}

export function forEachArrayAt(untrustedData: UntrustedData, atPath: PropertyPath, callback: (value: UntrustedData[], key: string) => void): void {
  forEachAt(untrustedData, atPath, (value, key) => {
    if (isArray(value)) {
      callback(value, key)
    }
  })
}
