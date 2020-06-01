import {migrate} from '../../../../src/client/configuration/migrations/008_UpdateMaxProjectsToShow'
import {MaxProjectsToShow, SETTINGS_ROOT} from '../../../../src/client/settings/SettingsReducer'

it('should not modify the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should set the max projects to display to focused if < 12', () => {
  const data = {
    [SETTINGS_ROOT]: {
      maxProjectsToShow: 9
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {maxProjectsToShow: MaxProjectsToShow.focused}})
})

it('should set the max projects to display to balanced if = 12', () => {
  const data = {
    [SETTINGS_ROOT]: {
      maxProjectsToShow: 12
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {maxProjectsToShow: MaxProjectsToShow.balanced}})
})

it('should set the max projects to display to intense if > 12', () => {
  const data = {
    [SETTINGS_ROOT]: {
      maxProjectsToShow: 24
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {maxProjectsToShow: MaxProjectsToShow.intense}})
})

it('should set the max projects to display to everything if Number.MAX_SAFE_INTEGER', () => {
  const data = {
    [SETTINGS_ROOT]: {
      maxProjectsToShow: Number.MAX_SAFE_INTEGER
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {maxProjectsToShow: MaxProjectsToShow.everything}})
})
