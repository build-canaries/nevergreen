import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'

export function isBlank(s) {
  return isEmpty(trim(s))
}
