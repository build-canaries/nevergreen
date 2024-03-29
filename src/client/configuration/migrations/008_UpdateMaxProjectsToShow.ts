import { Migrate } from './index'
import get from 'lodash/get'
import has from 'lodash/has'
import set from 'lodash/set'
import { MaxProjectsToShow } from '../../settings/display/DisplaySettingsReducer'

export const id = '008_UpdateMaxProjectsToShow'

export const migrate: Migrate = (data) => {
  if (has(data, ['settings', 'maxProjectsToShow'])) {
    const oldValue = get(data, ['settings', 'maxProjectsToShow']) as number
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
    set(data, ['settings', 'maxProjectsToShow'], newValue)
  }
}
