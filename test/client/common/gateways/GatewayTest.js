import {proxyquire} from '../../TestUtils'
import {before, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'

describe('gateway', function () {

  let Gateway, superagent

  before(() => {
    superagent = {}
    Gateway = proxyquire('../../src/client/common/gateways/Gateway', {superagent})
  })

  beforeEach(() => {
  })

  describe('fake response', function () {
    it('should return a resolved promise with the given body', function () {
      const response = Gateway.fakeResponse('whatever')
      expect(response).to.be.a('promise')

      return response.then((req) => {
        expect(req).to.include({body: 'whatever'})
      })
    })
  })
})
