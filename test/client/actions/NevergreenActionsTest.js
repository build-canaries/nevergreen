import {proxyquire} from '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'

describe('NevergreenActions', function () {
  let NevergreenActions, LocalRepository, Gateway, moment, semver

  before(function () {
    LocalRepository = {}
    Gateway = {}
    moment = {}
    semver = {}
    NevergreenActions = proxyquire('../../src/client/actions/NevergreenActions', {
      '../common/repo/LocalRepository': LocalRepository,
      '../common/gateways/Gateway': Gateway,
      moment,
      semver
    })
  })

  describe('keyboard shortcut', function () {

    it('should return the correct type', function () {
      const actual = NevergreenActions.keyboardShortcut()
      expect(actual).to.have.property('type', NevergreenActions.KEYBOARD_SHORTCUT)
    })

    it('should return if they are shown', function () {
      const actual = NevergreenActions.keyboardShortcut(true)
      expect(actual).to.have.property('show', true)
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

  describe('notification', function () {

    it('should return the correct type', function () {
      const actual = NevergreenActions.notification()
      expect(actual).to.have.property('type', NevergreenActions.NOTIFICATION)
    })

    it('should return the message', function () {
      const actual = NevergreenActions.notification('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })
  })

  describe('notification dismiss', function () {

    it('should return the correct type', function () {
      const actual = NevergreenActions.dismiss()
      expect(actual).to.have.property('type', NevergreenActions.NOTIFICATION_DISMISS)
    })
  })

  describe('initalise', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
    })

    it('should dispatch initalising action', function () {
      LocalRepository.init = sinon.spy()
      LocalRepository.getConfiguration = sinon.stub().returns(Promise.resolve({}))
      moment.updateLocale = sinon.spy()
      NevergreenActions.initalise()(dispatch)
      expect(dispatch).to.have.been.calledWithMatch({type: NevergreenActions.INITIALISING})
    })

    it('should update the moment locale with shorter relative time strings', function () {
      LocalRepository.init = sinon.spy()
      LocalRepository.getConfiguration = sinon.stub().returns(Promise.resolve({}))
      moment.updateLocale = sinon.spy()
      NevergreenActions.initalise()(dispatch)
      expect(moment.updateLocale).to.have.been.called
    })

    it('should initalise the local repository', function () {
      LocalRepository.init = sinon.spy()
      LocalRepository.getConfiguration = sinon.stub().returns(Promise.resolve({}))
      moment.updateLocale = sinon.spy()
      NevergreenActions.initalise()(dispatch)
      expect(LocalRepository.init).to.have.been.called
    })

    it('should dispatch initalised action once configuration is loaded', function () {
      LocalRepository.init = sinon.spy()
      LocalRepository.getConfiguration = sinon.stub().returns(Promise.resolve({}))
      moment.updateLocale = sinon.spy()
      return NevergreenActions.initalise()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: NevergreenActions.INITIALISED})
      })
    })
  })

  describe('check for new version', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
    })

    it('should call the github releases api', function () {
      Gateway.get = sinon.stub().returns(Promise.resolve({}))
      semver.gt = sinon.stub().returns(true)
      NevergreenActions.checkForNewVersion()(dispatch)
      expect(Gateway.get).to.have.been.calledWith('https://api.github.com/repos/build-canaries/nevergreen/releases/latest')
    })

    it('should dispatch notification if a new version is available', function () {
      Gateway.get = sinon.stub().returns(Promise.resolve({}))
      semver.gt = sinon.stub().returns(true)
      return NevergreenActions.checkForNewVersion()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: NevergreenActions.NOTIFICATION})
      })
    })
  })
})
