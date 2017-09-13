import {proxyquire} from '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'

describe('NevergreenActions', function () {
  let NevergreenActions, LocalRepository, moment, Migrations

  before(function () {
    LocalRepository = {}
    moment = {}
    Migrations = {}
    NevergreenActions = proxyquire('../../src/client/actions/NevergreenActions', {
      '../common/repo/LocalRepository': LocalRepository,
      moment,
      '../common/repo/Migrations': Migrations
    })
  })

  describe('initalising', function () {

    it('should return the correct type', function () {
      const actual = NevergreenActions.initalising({foo: 'bar'})
      expect(actual).to.have.property('type', NevergreenActions.INITIALISING)
    })
  })

  describe('initalised', function () {

    it('should return the correct type', function () {
      const actual = NevergreenActions.initalised()
      expect(actual).to.have.property('type', NevergreenActions.INITIALISED)
    })

    it('should return the configuration', function () {
      const actual = NevergreenActions.initalised({foo: 'bar'})
      expect(actual).to.have.property('data').that.contains.property('foo', 'bar')
    })
  })

  describe('navigated', function () {

    it('should return the correct type', function () {
      const actual = NevergreenActions.navigated()
      expect(actual).to.have.property('type', NevergreenActions.NAVIGATED)
    })
  })

  describe('initalise', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
      Migrations.migrate = (data) => data
    })

    it('should dispatch initalising action', function () {
      LocalRepository.init = sinon.stub().returns(Promise.resolve({}))
      LocalRepository.load = sinon.stub().returns(Promise.resolve({}))
      moment.updateLocale = sinon.spy()
      NevergreenActions.initalise()(dispatch)
      expect(dispatch).to.have.been.calledWithMatch({type: NevergreenActions.INITIALISING})
    })

    it('should update the moment locale with shorter relative time strings', function () {
      LocalRepository.init = sinon.stub().returns(Promise.resolve({}))
      LocalRepository.load = sinon.stub().returns(Promise.resolve({}))
      moment.updateLocale = sinon.spy()
      NevergreenActions.initalise()(dispatch)
      expect(moment.updateLocale).to.have.been.called()
    })

    it('should initalise the local repository', function () {
      LocalRepository.init = sinon.stub().returns(Promise.resolve({}))
      LocalRepository.load = sinon.stub().returns(Promise.resolve({}))
      moment.updateLocale = sinon.spy()
      NevergreenActions.initalise()(dispatch)
      expect(LocalRepository.init).to.have.been.called()
    })

    it('should dispatch initalised action once configuration is loaded', function () {
      LocalRepository.init = sinon.stub().returns(Promise.resolve({}))
      LocalRepository.load = sinon.stub().returns(Promise.resolve({}))
      moment.updateLocale = sinon.spy()
      return NevergreenActions.initalise()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: NevergreenActions.INITIALISED})
      })
    })
  })

  describe('full screen', function () {

    it('should return the correct type', function () {
      const actual = NevergreenActions.enableFullScreen()
      expect(actual).to.have.property('type', NevergreenActions.FULL_SCREEN)
    })

    it('should return the enabled flag', function () {
      const actual = NevergreenActions.enableFullScreen(true)
      expect(actual).to.have.property('enabled', true)
    })
  })

  describe('request full screen', function () {

    it('should return the correct type', function () {
      const actual = NevergreenActions.requestFullScreen()
      expect(actual).to.have.property('type', NevergreenActions.REQUEST_FULL_SCREEN)
    })

    it('should return the requested flag', function () {
      const actual = NevergreenActions.requestFullScreen(true)
      expect(actual).to.have.property('requested', true)
    })
  })
})
