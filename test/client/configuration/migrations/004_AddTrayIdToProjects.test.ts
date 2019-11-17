import {migrate} from '../../../../src/client/configuration/migrations/004_AddTrayIdToProjects'
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

it('should not modify the given data if it contains the projects and tray id keys but it is not an array', () => {
  const data = {[PROJECTS_ROOT]: {trayId: 'invalid'}}
  migrate(data)
  expect(data).toEqual({[PROJECTS_ROOT]: {trayId: 'invalid'}})
})

it('should not modify the given data if it contains the projects and tray id keys but an array that does not contain an object', () => {
  const data = {[PROJECTS_ROOT]: {trayId: ['invalid']}}
  migrate(data)
  expect(data).toEqual({[PROJECTS_ROOT]: {trayId: ['invalid']}})
})

it('should add the tray id to projects', () => {
  const trayId = 'trayId'
  const projectId1 = 'projectId1'
  const projectId2 = 'projectId2'
  const data = {
    [PROJECTS_ROOT]: {
      [trayId]: [
        {projectId: projectId1},
        {projectId: projectId2}
      ]
    }
  }
  migrate(data)
  expect(data).toHaveProperty([PROJECTS_ROOT, trayId], [
    {projectId: projectId1, trayId},
    {projectId: projectId2, trayId}
  ])
})
