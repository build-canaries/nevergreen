import {migrate, moveData} from '../../../src/client/configuration/Migrate'
import * as migrations from '../../../src/client/configuration/migrations'
import {APPLIED_MIGRATIONS_ROOT} from '../../../src/client/configuration/MigrationsReducer'

const isoDateTime = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

it('should migrate the given data by mutating it, including adding any applied migrations', () => {
  const migrationId = '20191004195445_A'
  jest.spyOn(migrations, 'getMigrations').mockReturnValue({
    [migrationId]: (data) => moveData(data, 'foo', 'baz')
  })
  const data = {foo: 'bar'}

  migrate(data)

  expect(data).toHaveProperty('baz', 'bar')
  expect(data).toHaveProperty(APPLIED_MIGRATIONS_ROOT, [{
    id: migrationId,
    timestamp: expect.stringMatching(isoDateTime)
  }])
  expect(data).not.toHaveProperty('foo')
})

it('should apply migrations in ordered by ID, so migrations can build on previous migrations', () => {
  jest.spyOn(migrations, 'getMigrations').mockReturnValue({
    '20191005125402_B': (data) => moveData(data, 'baz', 'bux'),
    '20191004195445_A': (data) => moveData(data, 'foo', 'baz'),
    '20191006120427_C': (data) => moveData(data, 'bux', 'fiz')
  })
  const data = {foo: 'bar'}

  migrate(data)

  expect(data).toHaveProperty('fiz', 'bar')
})

it('should not apply already applied migrations', () => {
  const migrationId = '20191004195445_A'
  const migration = jest.fn()
  jest.spyOn(migrations, 'getMigrations').mockReturnValue({
    [migrationId]: migration
  })
  const data = {
    [APPLIED_MIGRATIONS_ROOT]: [
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
