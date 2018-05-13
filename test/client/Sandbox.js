import {afterEach} from 'mocha'
import sinon from 'sinon'

const sandbox = sinon.createSandbox()

afterEach(function () {
  // Only reset history so fakes can be setup for multiple tests.
  // This does mean tests must call restore() in an after block to clean up correctly
  sandbox.resetHistory()
})

export {sandbox}
