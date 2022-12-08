import { migrate } from './010_SetTrackingMode'
import { feedsRoot } from '../../settings/tracking/FeedsReducer'
import { TrackingMode } from '../../domain/Feed'

it('should not modify the given data if it does not contain projects', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it('should not modify the given data if it contains the feeds key but it is not an object', () => {
  const data = { [feedsRoot]: 'invalid' }
  migrate(data)
  expect(data).toEqual({ [feedsRoot]: 'invalid' })
})

it('should not modify the given data if it contains the feeds and tray id keys but it is not an object', () => {
  const data = { [feedsRoot]: { trayId: 'invalid' } }
  migrate(data)
  expect(data).toEqual({ [feedsRoot]: { trayId: 'invalid' } })
})

it('should not change the tracking mode if it already exists', () => {
  const trayId = 'trayId'
  const data = {
    [feedsRoot]: {
      [trayId]: {
        trackingMode: TrackingMode.everything,
      },
    },
  }
  migrate(data)
  expect(data).toHaveProperty(
    [feedsRoot, trayId, 'trackingMode'],
    TrackingMode.everything
  )
})

it('should add the tracking mode selected as this was the old default mode', () => {
  const trayId = 'trayId'
  const data = {
    [feedsRoot]: {
      [trayId]: {},
    },
  }
  migrate(data)
  expect(data).toHaveProperty(
    [feedsRoot, trayId, 'trackingMode'],
    TrackingMode.selected
  )
})
