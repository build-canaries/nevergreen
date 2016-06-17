import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit} from '../../../src/js/NevergreenActions'
import {IMPORTING_DATA} from '../../../src/js/backup/BackupActions'
import {MessageAdd, MessageRemove} from '../../../src/js/success/SuccessActions'

describe('success store', () => {

  let subject, AppDispatcher, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/js/stores/SuccessStore', {'../common/AppDispatcher': AppDispatcher})

    callback = AppDispatcher.register.getCall(0).args[0]
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
    
    callback({
      type: AppInit,
      configuration: {
        success: {
          messages: []
        }
      }
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register).to.have.been.called
  })

  it('adds a message', () => {
    callback({
      type: MessageAdd,
      message: 'some-message'
    })
    expect(subject.getMessages()).to.deep.equal(['some-message'])
  })

  it('adds an image', () => {
    callback({
      type: MessageAdd,
      message: 'http://some-url'
    })
    expect(subject.getImages()).to.deep.equal(['http://some-url'])
  })

  it('removes a message', () => {
    callback({
      type: MessageAdd,
      message: 'some-message'
    })
    callback({
      type: MessageRemove,
      message: 'some-message'
    })
    expect(subject.getMessages()).to.deep.equal([])
  })

  it('removes an image', () => {
    callback({
      type: MessageAdd,
      message: 'http://some-url'
    })
    callback({
      type: MessageRemove,
      message: 'http://some-url'
    })
    expect(subject.getImages()).to.deep.equal([])
  })

  it('returns a blank random message if none have been added', () => {
    expect(subject.randomMessage()).to.equal('')
  })

  it('returns a random message', () => {
    callback({
      type: MessageAdd,
      message: 'some-message'
    })
    callback({
      type: MessageAdd,
      message: 'http://some-url'
    })
    expect(subject.randomMessage()).to.not.equal('')
  })

  it('can return just messages', () => {
    callback({
      type: MessageAdd,
      message: 'some-message'
    })
    callback({
      type: MessageAdd,
      message: 'http://some-url'
    })
    expect(subject.getMessages()).to.deep.equal(['some-message'])
  })

  it('can return just images', () => {
    callback({
      type: MessageAdd,
      message: 'some-message'
    })
    callback({
      type: MessageAdd,
      message: 'http://some-url'
    })
    expect(subject.getImages()).to.deep.equal(['http://some-url'])
  })

  it('can return all images and messages', () => {
    callback({
      type: MessageAdd,
      message: 'some-message'
    })
    callback({
      type: MessageAdd,
      message: 'http://some-url'
    })
    expect(subject.getAll()).to.deep.equal(['some-message', 'http://some-url'])
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: IMPORTING_DATA
    })
    expect(subject.getAll()).to.deep.equal([])
  })

  describe('knows if a string is a url or not', () => {
    it('returns true for any string starting with http', () => {
      expect(subject.isUrl('http')).to.be.true
    })

    it('if returns false if the string does not start with http', () => {
      expect(subject.isUrl('ftp')).to.be.false
    })
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(subject.validate(obj)).to.deep.equal(['The top level key success is missing!'])
    })

    it('returns an error message if the messages key does not exist', () => {
      const obj = {
        success: {}
      }
      expect(subject.validate(obj)).to.deep.equal(['The nested key success.messages is missing!'])
    })

    it('returns an error message if the messages key is not an array', () => {
      const obj = {
        success: {
          messages: 'not-an-array'
        }
      }
      expect(subject.validate(obj)).to.deep.equal(['The nested key success.messages must be an array!'])
    })

    it('returns an error message if the messages key is an array with elements that are not strings', () => {
      const obj = {
        success: {
          messages: ['ok', 1, 'also-ok']
        }
      }
      expect(subject.validate(obj)).to.deep.equal(['The nested key success.messages has an invalid element at index 1! It can only contain strings.'])
    })
  })

})
