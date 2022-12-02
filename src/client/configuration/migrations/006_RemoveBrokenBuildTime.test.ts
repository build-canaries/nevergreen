import {migrate} from './006_RemoveShowBrokenBuildTime'
import {settingsRoot} from '../../settings/SettingsReducer'

it('should not modify the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should not modify the given data if it contains the settings key but it is not an object', () => {
  const data = {[settingsRoot]: 'invalid'}
  migrate(data)
  expect(data).toEqual({[settingsRoot]: 'invalid'})
})

it('should remove the showBrokenBuildTime setting', () => {
  const data = {
    [settingsRoot]: {
      showBuildTime: true,
      showBrokenBuildTime: true
    }
  }
  migrate(data)
  expect(data).toEqual({[settingsRoot]: {showBuildTime: true}})
})
