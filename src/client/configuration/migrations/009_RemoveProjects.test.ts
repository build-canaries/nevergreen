import { migrate } from './009_RemoveProjects'

it('should not modify the given data if it does not contain projects', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it('should remove projects', () => {
  const data = {
    projects: {},
  }
  migrate(data)
  expect(data).toEqual({})
})
