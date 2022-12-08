import { Migrate } from './index'
import unset from 'lodash/unset'

export const id = '009_RemoveProjects'

export const migrate: Migrate = (data) => {
  unset(data, 'projects')
}
