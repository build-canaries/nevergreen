import { migrate } from './001_MoveAudioVisualToSettings'

it('should return the given data if it does not contain audioVisual', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it('should move audioVisual to settings', () => {
  const data = { audioVisual: { foo: 'bar' } }
  migrate(data)
  expect(data).toHaveProperty('settings', { foo: 'bar' })
  expect(data).not.toHaveProperty('audioVisual')
})
