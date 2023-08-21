import { Migrate } from './index'
import set from 'lodash/set'
import isArray from 'lodash/isArray'

export const id = '016_MigrateSuccess'

export const migrate: Migrate = (data) => {
  if (isArray(data['success'])) {
    set(data, 'success', { messages: data['success'] })
  }
}
