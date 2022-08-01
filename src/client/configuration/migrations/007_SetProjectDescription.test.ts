import {migrate} from './007_SetProjectDescription'

it('should not modify the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should not modify the given data if it contains the projects key but it is not an array', () => {
  const data = {['projects']: 'invalid'}
  migrate(data)
  expect(data).toEqual({['projects']: 'invalid'})
})

it('should set the description to the name if stage is blank', () => {
  const data = {
    ['projects']: {
      trayId: [{
        name: 'some-name',
        stage: ''
      }]
    }
  }
  migrate(data)
  expect(data).toEqual({['projects']: {trayId: [{description: 'some-name'}]}})
})

it('should set the description to the name and stage if the stage is not blank', () => {
  const data = {
    ['projects']: {
      trayId: [{
        name: 'some-name',
        stage: 'some-stage'
      }]
    }
  }
  migrate(data)
  expect(data).toEqual({['projects']: {trayId: [{description: 'some-name some-stage'}]}})
})
