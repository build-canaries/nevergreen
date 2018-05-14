import {beforeEach} from 'mocha'
import sinon from 'sinon'

export const mocks = sinon

beforeEach('resetting mocks', function () {
  sinon.reset()
})

export function containsMessage(msg) {
  return sinon.match.some(sinon.match(msg))
}

export function containsOnlyMessage(msg) {
  return sinon.match.every(sinon.match(msg))
}
