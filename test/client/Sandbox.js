import {afterEach} from 'mocha'
import sinon from 'sinon'

const sandbox = sinon.createSandbox()

afterEach(function () {
  sandbox.verifyAndRestore()
  sandbox.reset()
})

export {sandbox}
