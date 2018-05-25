import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../../Mocking'

describe('SecurityGateway', function () {

  const post = mocks.stub()

  const {encryptPassword} = withMockedImports('client/common/gateways/SecurityGateway', {
    './Gateway': {post}
  })

  describe('encryptPassword', function () {

    it('should call the encrypt URL', function () {
      encryptPassword('some-password')

      expect(post).to.have.been.calledWith('/api/encrypt', {password: 'some-password'})
    })
  })
})
