import _ from 'lodash'
import {send as gatewaySend} from './Gateway'

export async function send(request) {
  try {
    return await gatewaySend(request)
  } catch (err) {
    const status = err.status
    const message = _.get(err, 'body.errorMessage', err.body)

    throw {status, message}
  }
}
