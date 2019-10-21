import {forEachObjectAt, Migration, moveData} from '../Migrate'
import {TRAYS_ROOT} from '../../tracking/TraysReducer'

export const id = '20191016201731_PrefixEncryptedValues'

export const migrate: Migration = (data) => {
  forEachObjectAt(data, TRAYS_ROOT, (tray) => {
    moveData(tray, 'password', 'encryptedPassword')
    moveData(tray, 'accessToken', 'encryptedAccessToken')
  })
}
