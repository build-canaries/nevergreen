import {Migrate} from './index'
import unset from 'lodash/unset'

export const id = '011_RemoveOldKeys'

export const migrate: Migrate = (data) => {
  unset(data, 'nevergreen')
  unset(data, 'github')
  unset(data, 'gitlab')
  unset(data, 'backup')
}
