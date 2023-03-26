import { migrate } from './006_RemoveShowBrokenBuildTime'

it('should not modify the given data if it does not contain settings', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it('should not modify the given data if it contains the settings key but it is not an object', () => {
  const data = { settings: 'invalid' }
  migrate(data)
  expect(data).toEqual({ settings: 'invalid' })
})

it('should remove the showBrokenBuildTime setting', () => {
  const data = {
    settings: {
      showBuildTime: true,
      showBrokenBuildTime: true,
    },
  }
  migrate(data)
  expect(data).toEqual({ settings: { showBuildTime: true } })
})
