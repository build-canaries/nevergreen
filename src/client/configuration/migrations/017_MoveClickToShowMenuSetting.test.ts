import { migrate } from './017_MoveClickToShowMenuSetting'

it('should return the given data if it does not contain settings', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it('should move click to show menu to other settings', () => {
  const data = {
    settings: {
      clickToShowMenu: true,
    },
  }
  migrate(data)
  expect(data).toEqual({
    otherSettings: {
      clickToShowMenu: true,
    },
    settings: {},
  })
})
