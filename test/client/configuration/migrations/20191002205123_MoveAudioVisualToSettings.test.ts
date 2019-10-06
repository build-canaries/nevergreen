import {migrate} from '../../../../src/client/configuration/migrations/20191002205123_MoveAudioVisualToSettings'
import {SETTINGS_ROOT} from '../../../../src/client/settings/SettingsReducer'

it('should return the given data if it does not contain settings', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should move audioVisual to settings', () => {
  const data = {audioVisual: {foo: 'bar'}}
  migrate(data)
  expect(data).toHaveProperty(SETTINGS_ROOT, {foo: 'bar'})
  expect(data).not.toHaveProperty('audioVisual')
})
