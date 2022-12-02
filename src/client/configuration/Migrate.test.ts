import {migrate, moveData} from './Migrate'
import * as migrations from '../configuration/migrations'
import {migrationsRoot} from './MigrationsReducer'

const isoDateTime = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

it('should migrate the given data by mutating it, including adding any applied migrations', () => {
  const migrationId = '20191004195445_A'
  jest.spyOn(migrations, 'getOrderedMigrations').mockReturnValue([
    {id: migrationId, migrate: (data) => moveData(data, 'foo', 'baz')}
  ])
  const data = {foo: 'bar'}

  migrate(data)

  expect(data).toHaveProperty('baz', 'bar')
  expect(data).toHaveProperty(migrationsRoot, [{
    id: migrationId,
    timestamp: expect.stringMatching(isoDateTime) as string
  }])
  expect(data).not.toHaveProperty('foo')
})

it('should apply migrations in the order they are returned', () => {
  jest.spyOn(migrations, 'getOrderedMigrations').mockReturnValue([
    {id: '20191004195445_A', migrate: (data) => moveData(data, 'foo', 'baz')},
    {id: '20191005125402_B', migrate: (data) => moveData(data, 'baz', 'bux')},
    {id: '20191006120427_C', migrate: (data) => moveData(data, 'bux', 'fiz')}
  ])
  const data = {foo: 'bar'}

  migrate(data)

  expect(data).toHaveProperty('fiz', 'bar')
})

it('should not apply already applied migrations', () => {
  const migrationId = '20191004195445_A'
  const migration = jest.fn()
  jest.spyOn(migrations, 'getOrderedMigrations').mockReturnValue([
    {id: migrationId, migrate: migration}
  ])
  const data = {
    [migrationsRoot]: [
      {
        id: migrationId,
        timestamp: 'some-timestamp'
      }
    ],
    baz: 'bar'
  }

  migrate(data)

  expect(migration).not.toHaveBeenCalled()
})
