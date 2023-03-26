import { Migrate } from './index'
import unset from 'lodash/unset'

export const id = '006_RemoveShowBrokenBuildTime'

export const migrate: Migrate = (data) => {
  unset(data, ['settings', 'showBrokenBuildTime'])
}
