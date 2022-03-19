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

const oneMinute = 1000 * 60
const timeout = {
  response: oneMinute,
  deadline: oneMinute
}
const retries = 1
const acceptHeader = 'application/json; charset=utf-8'
const contentType = 'application/json; charset=utf-8'

export const TIMEOUT_ERROR = 'Connection timeout calling the Nevergreen server'

export function post<T>(url: string, data: ApiData, headers = {}): Request<T> {
  return request
    .post(url)
    .send(data)
    .accept(acceptHeader)
    .type(contentType)
    .set(headers)
    .timeout(timeout)
    .retry(retries)
}

export function get<T>(url: string, headers = {}): Request<T> {
  return request
    .get(url)
    .accept(acceptHeader)
    .set(headers)
    .timeout(timeout)
    .retry(retries)
}

export async function send<T>(request: Request<T>, signal?: AbortSignal): Promise<T> {
  signal?.addEventListener('abort', () => request.abort())
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
