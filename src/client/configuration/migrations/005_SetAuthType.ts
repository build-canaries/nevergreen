import { forEachObjectAt } from '../Migrate'
import { Migrate } from './index'
import has from 'lodash/has'
import { AuthTypes, feedsRoot } from '../../settings/tracking/FeedsReducer'
import { isBlank } from '../../common/Utils'

export const id = '005_SetAuthType'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, feedsRoot, (feed) => {
    if (!has(feed, 'authType')) {
      if (!isBlank(feed.username) || !isBlank(feed.encryptedPassword)) {
        feed.authType = AuthTypes.basic
      } else if (!isBlank(feed.encryptedAccessToken)) {
        feed.authType = AuthTypes.token
      } else {
        feed.authType = AuthTypes.none
      }
    }
  })
}
