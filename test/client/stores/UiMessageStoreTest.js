import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit, KeyboardShortcuts} from '../../../src/client/NevergreenActions'
import {IMPORTED_DATA, IMPORTING_DATA, IMPORT_ERROR} from '../../../src/client/backup/BackupActions'
import {MESSAGE_INVALID_INPUT, MESSAGE_ADD, MESSAGE_REMOVE} from '../../../src/client/success/SuccessActions'

describe('ui message store', () => {

  let AppDispatcher, subject, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/client/stores/UiMessageStore', {'../common/AppDispatcher': AppDispatcher})

    callback = AppDispatcher.register.getCall(0).args[0]
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
    callback({
      type: AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register).to.have.been.called
  })

  describe('init', () => {
    beforeEach(() => {
      callback({
        type: AppInit
      })
    })

    it('starts with no success errors', () => {
      expect(subject.getSuccessErrors()).to.deep.equal([])
    })

    it('starts with no import errors', () => {
      expect(subject.getImportErrors()).to.deep.equal([])
    })

    it('starts with no import infos', () => {
      expect(subject.getImportInfos()).to.deep.equal([])
    })

    it('starts with keyboard shortcuts hidden', () => {
      expect(subject.showKeyboardShortcuts()).to.be.false
    })
  })

  describe('restore', () => {
    beforeEach(() => {
      callback({
        type: IMPORTED_DATA,
        messages: ['some-message']
      })
    })

    it('clears success errors', () => {
      expect(subject.getSuccessErrors()).to.deep.equal([])
    })

    it('clears import errors', () => {
      expect(subject.getImportErrors()).to.deep.equal([])
    })

    it('sets import infos to event messages', () => {
      expect(subject.getImportInfos()).to.deep.equal(['some-message'])
    })
  })

  describe('adding a success message', () => {
    beforeEach(() => {
      callback({
        type: MESSAGE_INVALID_INPUT,
        errors: ['some-error']
      })
    })

    it('sets errors', () => {
      expect(subject.getSuccessErrors()).to.deep.equal(['some-error'])
    })

    it('clears errors on successful add', () => {
      callback({
        type: MESSAGE_ADD
      })
      expect(subject.getSuccessErrors()).to.deep.equal([])
    })

    it('clears errors on removal', () => {
      callback({
        type: MESSAGE_REMOVE
      })
      expect(subject.getSuccessErrors()).to.deep.equal([])
    })
  })

  describe('importing data', () => {
    beforeEach(() => {
      callback({
        type: IMPORT_ERROR,
        errors: ['some-error']
      })
    })

    it('sets errors', () => {
      expect(subject.getImportErrors()).to.deep.equal(['some-error'])
    })

    it('clears infos', () => {
      expect(subject.getImportInfos()).to.deep.equal([])
    })

    it('clears errors and infos when importing', () => {
      callback({
        type: IMPORTING_DATA
      })
      expect(subject.getImportErrors()).to.deep.equal([])
      expect(subject.getImportInfos()).to.deep.equal([])
    })
  })

  describe('keyboard shortcuts', () => {
    let cancelCallback

    beforeEach(() => {
      cancelCallback = sinon.spy()
      callback({
        type: KeyboardShortcuts,
        show: true,
        cancel: cancelCallback
      })
    })

    it('sets show', () => {
      expect(subject.showKeyboardShortcuts()).to.be.true
    })

    it('cancels the previous timer if the event is triggered again', () => {
      callback({
        type: KeyboardShortcuts,
        show: true,
        cancel: sinon.spy()
      })
      expect(cancelCallback).to.have.been.called
    })
  })
})
