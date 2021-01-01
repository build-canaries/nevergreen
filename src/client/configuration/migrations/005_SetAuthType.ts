import {forEachObjectAt} from '../Migrate'
import {Migrate} from './index'
import has from 'lodash/has'
import {TRAYS_ROOT} from '../../tracking/TraysReducer'
import {AuthTypes} from '../../domain/Tray'
import {isBlank} from '../../common/Utils'

export const id = '005_SetAuthType'

export const migrate: Migrate = (data) => {
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
