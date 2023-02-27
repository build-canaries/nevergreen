import { migrate } from './016_MigrateSuccess'
import { successRoot } from '../../settings/success/SuccessReducer'

it('should migrate success messages', () => {
  const data = {
    [successRoot]: ['=(^.^)='],
  }
  migrate(data)
  expect(data).toEqual({
    [successRoot]: {
      messages: ['=(^.^)='],
    },
  })
})

it('should migrate empty success messages', () => {
  const data = {
    [successRoot]: [],
  }
  migrate(data)
  expect(data).toEqual({
    [successRoot]: {
      messages: [],
    },
  })
})

it('should do nothing if no success root', () => {
  const data = {}
  migrate(data)
  expect(data).toEqual({})
})

it('should not migrate if success is not an array', () => {
  const data = { [successRoot]: {} }
  migrate(data)
  expect(data).toEqual({ [successRoot]: {} })
})
