import { Migrate } from './index'
import { forEachObjectAt } from '../Migrate'
import { TrackingMode } from '../../settings/tracking/FeedsReducer'
import has from 'lodash/has'

export const id = '010_SetTrackingMode'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, 'trays', (feed) => {
    if (!has(feed, 'trackingMode')) {
      feed.trackingMode = TrackingMode.selected
    }
  })
}
