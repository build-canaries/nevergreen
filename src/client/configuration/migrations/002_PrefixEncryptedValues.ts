import {forEachObjectAt, moveData} from '../Migrate'
import {Migrate} from './index'
import {FEEDS_ROOT} from '../../settings/tracking/FeedsReducer'

export const id = '002_PrefixEncryptedValues'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, FEEDS_ROOT, (feed) => {
    moveData(feed, 'password', 'encryptedPassword')
    moveData(feed, 'accessToken', 'encryptedAccessToken')
  })
}
