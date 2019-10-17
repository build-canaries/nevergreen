import {hasObject, Migration, moveData} from '../Migrate'
import {TRAYS_ROOT} from '../../tracking/TraysReducer'

export const id = '20191016201731_PrefixEncryptedValues'

export const migrate: Migration = (data) => {
  if (hasObject(data, TRAYS_ROOT)) {
    Object.keys(data[TRAYS_ROOT] as object).forEach((trayId) => {
      moveData(data, [TRAYS_ROOT, trayId, 'password'], [TRAYS_ROOT, trayId, 'encryptedPassword'])
      moveData(data, [TRAYS_ROOT, trayId, 'accessToken'], [TRAYS_ROOT, trayId, 'encryptedAccessToken'])
    })
  }
}
