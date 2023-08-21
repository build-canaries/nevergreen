import { Migrate } from './index'
import { forEachObjectAt, moveData } from '../Migrate'
import get from 'lodash/get'
import { isNotBlank } from '../../common/Utils'
import unset from 'lodash/unset'

export const id = '018_CombineFeedAuthSettings'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, 'trays', (feed) => {
    if (isNotBlank(get(feed, 'encryptedPassword'))) {
      moveData(feed, 'encryptedPassword', 'encryptedAuth')
    }
    if (isNotBlank(get(feed, 'encryptedAccessToken'))) {
      moveData(feed, 'encryptedAccessToken', 'encryptedAuth')
    }
    unset(feed, 'encryptedPassword')
    unset(feed, 'encryptedAccessToken')
  })
}
