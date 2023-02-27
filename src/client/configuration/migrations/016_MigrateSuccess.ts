import { Migrate } from './index'
import set from 'lodash/set'
import isArray from 'lodash/isArray'
import { successRoot } from '../../settings/success/SuccessReducer'

export const id = '016_MigrateSuccess'

export const migrate: Migrate = (data) => {
  if (isArray(data[successRoot])) {
    set(data, successRoot, { messages: data[successRoot] })
  }
}
