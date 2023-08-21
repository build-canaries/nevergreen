import { forEachObjectAt, moveData } from '../Migrate'
import { Migrate } from './index'

export const id = '002_PrefixEncryptedValues'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, 'trays', (feed) => {
    moveData(feed, 'password', 'encryptedPassword')
    moveData(feed, 'accessToken', 'encryptedAccessToken')
  })
}
