import {Migrate} from './index'
import {forEachObjectAt} from '../Migrate'
import {feedsRoot} from '../../settings/tracking/FeedsReducer'
import has from 'lodash/has'
import {TrackingMode} from '../../domain/Feed'

export const id = '010_SetTrackingMode'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, feedsRoot, (feed) => {
    if (!has(feed, 'trackingMode')) {
      feed.trackingMode = TrackingMode.selected
    }
  })
}
