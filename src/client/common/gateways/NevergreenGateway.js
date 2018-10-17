import {send as gatewaySend} from './Gateway'
import {isImmutable} from 'immutable'

export async function send(request) {
  try {
    return await gatewaySend(request)
  } catch (error) {
    const message = isImmutable(error.body)
      ? error.body.get('errorMessage')
      : error.body
    throw new Error(message)
  }
}
