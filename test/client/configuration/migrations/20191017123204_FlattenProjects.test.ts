import {migrate} from '../../../../src/client/configuration/migrations/20191017123204_FlattenProjects'
import {PROJECTS_ROOT} from '../../../../src/client/tracking/ProjectsReducer'

it('should not modify the given data if it does not contain projects', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should not modify the given data if it contains the projects key but it is not an object', () => {
  const data = {[PROJECTS_ROOT]: 'invalid'}
  migrate(data)
  expect(data).toEqual({[PROJECTS_ROOT]: 'invalid'})
})

it('should not modify the given data if it contains the projects and tray id keys but it is not an object', () => {
  const data = {[PROJECTS_ROOT]: {trayId: 'invalid'}}
  migrate(data)
  expect(data).toEqual({[PROJECTS_ROOT]: {trayId: 'invalid'}})
})

it('should flatten projects', () => {
  const trayId = 'trayId'
  const projectId1 = 'projectId1'
  const projectId2 = 'projectId2'
  const data = {
    [PROJECTS_ROOT]: {
      [trayId]: {
        [projectId1]: {foo: 'bar'},
        [projectId2]: {baz: 'bux'}
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([PROJECTS_ROOT, trayId], [{foo: 'bar'}, {baz: 'bux'}])
  expect(data).not.toHaveProperty([PROJECTS_ROOT, trayId, projectId1])
  expect(data).not.toHaveProperty([PROJECTS_ROOT, trayId, projectId2])
})
