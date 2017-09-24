import _ from 'lodash'

export function isBlank(s) {
  return _.isEmpty(_.trim(s))
}
