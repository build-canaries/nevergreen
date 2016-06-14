import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

chai.use(sinonChai)
sinonStubPromise(sinon)
