import {forEachObjectAt, moveData} from '../Migrate'
import {Migrate} from './index'
import {TRAYS_ROOT} from '../../settings/tracking/TraysReducer'

export const id = '002_PrefixEncryptedValues'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, TRAYS_ROOT, (tray) => {
    moveData(tray, 'password', 'encryptedPassword')
    moveData(tray, 'accessToken', 'encryptedAccessToken')
  })
}
