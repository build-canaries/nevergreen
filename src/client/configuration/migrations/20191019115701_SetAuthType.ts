import {forEachObjectAt, Migration} from '../Migrate'
import {has} from 'lodash'
import {TRAYS_ROOT} from '../../tracking/TraysReducer'
import {AuthTypes} from '../../domain/Tray'
import {isBlank} from '../../common/Utils'

export const id = '20191019115701_SetAuthType'

export const migrate: Migration = (data) => {
  forEachObjectAt(data, TRAYS_ROOT, (tray) => {
    if (!has(tray, 'authType')) {
      if (!isBlank(tray.username) || !isBlank(tray.encryptedPassword)) {
        tray.authType = AuthTypes.basic
      } else if (!isBlank(tray.encryptedAccessToken)) {
        tray.authType = AuthTypes.token
      } else {
        tray.authType = AuthTypes.none
      }
    }
  })
}
