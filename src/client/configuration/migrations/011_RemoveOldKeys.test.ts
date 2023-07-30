import { migrate } from './011_RemoveOldKeys'

it('should not modify the given data if it does not contain old keys', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it.each(['nevergreen', 'github', 'gitlab', 'backup'])(
  'should remove the old "%s" key',
  (key) => {
    const data = { [key]: {} }
    migrate(data)
    expect(data).not.toHaveProperty(key)
  },
)
