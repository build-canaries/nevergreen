import {Migrate} from './index'
import {get, has, set} from 'lodash'
import {MaxProjectsToShow, SETTINGS_ROOT} from '../../settings/SettingsReducer'

export const id = '008_UpdateMaxProjectsToShow'

export const migrate: Migrate = (data) => {
  if (has(data, [SETTINGS_ROOT, 'maxProjectsToShow'])) {
    const oldValue = get(data, [SETTINGS_ROOT, 'maxProjectsToShow']) as number
    let newValue
    if (oldValue < 12) {
      newValue = MaxProjectsToShow.small
    } else if (oldValue === 12) {
      newValue = MaxProjectsToShow.medium
    } else if (oldValue > 12 && oldValue < Number.MAX_SAFE_INTEGER) {
      newValue = MaxProjectsToShow.large
    } else {
      newValue = MaxProjectsToShow.all
    }
    set(data, [SETTINGS_ROOT, 'maxProjectsToShow'], newValue)
  }
}
