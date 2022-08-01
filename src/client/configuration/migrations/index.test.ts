import {getOrderedMigrations} from './'

it('every migration should have a unique id', () => {
  const migrations = getOrderedMigrations()
  const ids = migrations.map((migration) => migration.id)
  expect(new Set(ids).size).toEqual(ids.length)
})
