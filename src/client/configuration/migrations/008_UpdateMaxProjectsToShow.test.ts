import {migrate} from './008_UpdateMaxProjectsToShow'
import {MaxProjectsToShow, SETTINGS_ROOT} from '../../settings/SettingsReducer'

it('should not modify the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should set the max projects to display to small if < 12', () => {
  const data = {
    [SETTINGS_ROOT]: {
      maxProjectsToShow: 9
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {maxProjectsToShow: MaxProjectsToShow.small}})
})

it('should set the max projects to display to medium if = 12', () => {
  const data = {
    [SETTINGS_ROOT]: {
      maxProjectsToShow: 12
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {maxProjectsToShow: MaxProjectsToShow.medium}})
})

it('should set the max projects to display to large if > 12', () => {
  const data = {
    [SETTINGS_ROOT]: {
      maxProjectsToShow: 24
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {maxProjectsToShow: MaxProjectsToShow.large}})
})

it('should set the max projects to display to all if Number.MAX_SAFE_INTEGER', () => {
  const data = {
    [SETTINGS_ROOT]: {
      maxProjectsToShow: Number.MAX_SAFE_INTEGER
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {maxProjectsToShow: MaxProjectsToShow.all}})
})
