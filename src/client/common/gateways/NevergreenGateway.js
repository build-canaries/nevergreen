import {send as gatewaySend} from './Gateway'
import {Record} from 'immutable'

export async function send(request) {
  try {
    return await gatewaySend(request)
  } catch (err) {
    const status = err.status
    const message = err.getIn(['body', 'errorMessage'], err.body)

    throw new NevergreenError({status, message})
  }
}

export class NevergreenError extends Record({
  status: 0,
  message: 'Unknown error'
}) {
}
