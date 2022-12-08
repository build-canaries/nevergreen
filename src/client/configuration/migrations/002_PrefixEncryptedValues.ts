import { forEachObjectAt, moveData } from '../Migrate'
import { Migrate } from './index'
import { feedsRoot } from '../../settings/tracking/FeedsReducer'

export const id = '002_PrefixEncryptedValues'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, feedsRoot, (feed) => {
    moveData(feed, 'password', 'encryptedPassword')
    moveData(feed, 'accessToken', 'encryptedAccessToken')
  })
}
