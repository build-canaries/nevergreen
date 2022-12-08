import request, { Response, SuperAgentRequest } from 'superagent'
import * as log from '../common/Logger'
import _get from 'lodash/get'
import { errorMessage } from '../common/Utils'
import { Prognosis } from '../domain/Project'

// eslint-disable-next-line @typescript-eslint/ban-types
type ApiData = object | string

export type Request<T> = SuperAgentRequest & Promise<Response & { body: T }>

interface Get {
  readonly url: string
  readonly headers?: Record<string, string>
  readonly signal?: AbortSignal
}

interface Post extends Get {
  readonly data: ApiData
}

export interface ServerError {
  readonly description: string
  readonly prognosis: Prognosis.error
  readonly timestamp: string
  readonly webUrl: string
}

const oneMinute = 1000 * 60
const timeout = {
  response: oneMinute,
  deadline: oneMinute,
}
const retries = 1
const acceptHeader = 'application/json; charset=utf-8'
const contentType = 'application/json; charset=utf-8'

export const TIMEOUT_ERROR = 'Connection timeout calling the Nevergreen server'

async function send<T>(request: Request<T>, signal?: AbortSignal): Promise<T> {
  signal?.addEventListener('abort', () => request.abort())
  try {
    const res = await request
    return (res.body || res.text) as T
  } catch (e) {
    const url = _get(e, 'url') || 'unknown'

    log.error(`An exception was thrown when calling URL '${url}'`, e)

    const message = _get(e, 'timeout')
      ? TIMEOUT_ERROR
      : _get(e, 'response.body.description') || errorMessage(e)

    throw new Error(message)
  }
}

export function post<T>({ url, data, headers = {}, signal }: Post): Promise<T> {
  return send<T>(
    request
      .post(url)
      .send(data)
      .accept(acceptHeader)
      .type(contentType)
      .set(headers)
      .timeout(timeout)
      .retry(retries),
    signal
  )
}

export function get<T>({ url, headers = {}, signal }: Get): Promise<T> {
  return send<T>(
    request
      .get(url)
      .accept(acceptHeader)
      .set(headers)
      .timeout(timeout)
      .retry(retries),
    signal
  )
}
