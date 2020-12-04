import {migrate} from './007_SetProjectDescription'
import {PROJECTS_ROOT} from '../../tracking/ProjectsReducer'

it('should not modify the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should not modify the given data if it contains the projects key but it is not an array', () => {
  const data = {[PROJECTS_ROOT]: 'invalid'}
  migrate(data)
  expect(data).toEqual({[PROJECTS_ROOT]: 'invalid'})
})

it('should set the description to the name if stage is blank', () => {
  const data = {
    [PROJECTS_ROOT]: {
      trayId: [{
        name: 'some-name',
        stage: ''
      }]
    }
  }
  migrate(data)
  expect(data).toEqual({[PROJECTS_ROOT]: {trayId: [{description: 'some-name'}]}})
})

it('should set the description to the name and stage if the stage is not blank', () => {
  const data = {
    [PROJECTS_ROOT]: {
      trayId: [{
        name: 'some-name',
        stage: 'some-stage'
      }]
    }
  }
  migrate(data)
  expect(data).toEqual({[PROJECTS_ROOT]: {trayId: [{description: 'some-name some-stage'}]}})
})
