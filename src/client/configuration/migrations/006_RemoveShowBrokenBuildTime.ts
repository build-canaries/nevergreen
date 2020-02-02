import {Migrate} from './index'
import {unset} from 'lodash'
import {SETTINGS_ROOT} from '../../settings/SettingsReducer'

export const id = '006_RemoveShowBrokenBuildTime'

export const migrate: Migrate = (data) => {
  unset(data, [SETTINGS_ROOT, 'showBrokenBuildTime'])
}
