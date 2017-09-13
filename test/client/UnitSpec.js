import chai from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
import chaiImmutable from 'chai-immutable'
import chaiEnzyme from 'chai-enzyme'
import ignore from 'ignore-styles'
import proxyquire from 'proxyquire'
import sinon from 'sinon'

ignore(['.scss', '.png', '.mp3'])

proxyquire.noCallThru()

// Note, the order of these matter!
chai.use(chaiImmutable)
chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(chaiEnzyme())

global.setTimeout = sinon.stub().returns('timer-id')
global.clearTimeout = sinon.spy()

export {proxyquire}

export function locator(name) {
  return `[data-locator="${name}"]`
}
