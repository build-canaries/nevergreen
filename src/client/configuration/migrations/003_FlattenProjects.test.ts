import { migrate } from './003_FlattenProjects'

it('should not modify the given data if it does not contain projects', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it('should not modify the given data if it contains the projects key but it is not an object', () => {
  const data = { ['projects']: 'invalid' }
  migrate(data)
  expect(data).toEqual({ ['projects']: 'invalid' })
})

it('should not modify the given data if it contains the projects and tray id keys but it is not an object', () => {
  const data = { ['projects']: { trayId: 'invalid' } }
  migrate(data)
  expect(data).toEqual({ ['projects']: { trayId: 'invalid' } })
})

it('should flatten projects', () => {
  const trayId = 'trayId'
  const projectId1 = 'projectId1'
  const projectId2 = 'projectId2'
  const data = {
    ['projects']: {
      [trayId]: {
        [projectId1]: { foo: 'bar' },
        [projectId2]: { baz: 'bux' },
      },
    },
  }
  migrate(data)
  expect(data).toHaveProperty(
    ['projects', trayId],
    [{ foo: 'bar' }, { baz: 'bux' }]
  )
  expect(data).not.toHaveProperty(['projects', trayId, projectId1])
  expect(data).not.toHaveProperty(['projects', trayId, projectId2])
})
