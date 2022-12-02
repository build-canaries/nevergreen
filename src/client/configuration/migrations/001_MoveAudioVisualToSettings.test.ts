import {migrate} from './001_MoveAudioVisualToSettings'
import {settingsRoot} from '../../settings/SettingsReducer'

it('should return the given data if it does not contain audioVisual', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should move audioVisual to settings', () => {
  const data = {audioVisual: {foo: 'bar'}}
  migrate(data)
  expect(data).toHaveProperty(settingsRoot, {foo: 'bar'})
  expect(data).not.toHaveProperty('audioVisual')
})
