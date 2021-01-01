import request, {Response, SuperAgentRequest} from 'superagent'
import * as log from '../common/Logger'
import _get from 'lodash/get'
import noop from 'lodash/noop'
import {errorMessage} from '../common/Utils'
import {Prognosis} from '../domain/Project'

// eslint-disable-next-line @typescript-eslint/ban-types
type ApiData = object | string

export type Request<T> = SuperAgentRequest & Promise<Response & { body: T; }>

export interface ServerError {
  readonly description: string;
  readonly prognosis: Prognosis.error;
  readonly timestamp: string;
  readonly webUrl: string;
}

const ONE_MINUTES = 1000 * 60
const TIMEOUT = {
  response: ONE_MINUTES,
  deadline: ONE_MINUTES
}
const RETRIES = 1
const ACCEPT_HEADER = 'application/json; charset=utf-8'
const CONTENT_TYPE = 'application/json; charset=utf-8'

export const TIMEOUT_ERROR = 'Connection timeout calling the Nevergreen server'

export function post<T>(url: string, data: ApiData, headers = {}): Request<T> {
  return request
    .post(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function get<T>(url: string, headers = {}): Request<T> {
  return request
    .get(url)
    .accept(ACCEPT_HEADER)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export async function send<T>(request: Request<T>): Promise<T> {
  try {
    const res = await request
    return (res.body || res.text) as T
  } catch (e) {
    const url = _get(e, 'url') as string || 'unknown'

    log.error(`An exception was thrown when calling URL '${url}'`, e)

    const message = _get(e, 'timeout')
      ? TIMEOUT_ERROR
      : _get(e, 'response.body.description') as string || errorMessage(e)

    throw new Error(message)
  }
}

export function fakeRequest<T>(body: T): Request<T> {
  return {body, abort: noop} as unknown as Request<T>
}

export function isAbortedRequest(e: unknown): boolean {
  return errorMessage(e) === 'Aborted'
}
