import { Migrate } from './index'
import unset from 'lodash/unset'
import { settingsRoot } from '../../settings/SettingsReducer'

export const id = '006_RemoveShowBrokenBuildTime'

export const migrate: Migrate = (data) => {
  unset(data, [settingsRoot, 'showBrokenBuildTime'])
}
