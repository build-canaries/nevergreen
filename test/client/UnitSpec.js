import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiImmutable from 'chai-immutable'
import ignore from 'ignore-styles'
import proxyquire from 'proxyquire'
import sinon from 'sinon'

ignore(['.scss', '.png', '.mp3'])

proxyquire.noCallThru()

chai.use(chaiImmutable)
chai.use(sinonChai)

global.setTimeout = sinon.stub().returns('timer-id')
global.clearTimeout = sinon.spy()

export {proxyquire}
