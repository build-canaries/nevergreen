import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
import ignore from 'ignore-styles'

ignore(['.scss', '.png', '.mp3'])

chai.use(sinonChai)
sinonStubPromise(sinon)
