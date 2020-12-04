import {migrate} from './006_RemoveShowBrokenBuildTime'
import {SETTINGS_ROOT} from '../../settings/SettingsReducer'

it('should not modify the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should not modify the given data if it contains the settings key but it is not an object', () => {
  const data = {[SETTINGS_ROOT]: 'invalid'}
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: 'invalid'})
})

it('should remove the showBrokenBuildTime setting', () => {
  const data = {
    [SETTINGS_ROOT]: {
      showBuildTime: true,
      showBrokenBuildTime: true
    }
  }
  migrate(data)
  expect(data).toEqual({[SETTINGS_ROOT]: {showBuildTime: true}})
})
