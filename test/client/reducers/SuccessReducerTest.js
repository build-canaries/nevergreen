import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/SuccessReducer'
import {INITIALISED} from '../../../src/client/actions/NevergreenActions'
import {IMPORTED_DATA} from '../../../src/client/actions/BackupActions'
import {TEXT_ADDED, IMAGE_ADDED, TEXT_REMOVED, IMAGE_REMOVED} from '../../../src/client/actions/SuccessActions'
import Immutable from 'immutable'

describe('SuccessReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialised action', function () {

    it('should merge the images success data', function () {
      const existingState = Immutable.Map({images: Immutable.OrderedSet(), texts: Immutable.OrderedSet()})
      const action = {type: INITIALISED, data: Immutable.fromJS({success: {images: ['url']}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('images').that.is.an.instanceof(Immutable.OrderedSet).that.contains('url')
    })

    it('should merge the texts success data', function () {
      const existingState = Immutable.Map({images: Immutable.OrderedSet(), texts: Immutable.OrderedSet()})
      const action = {type: INITIALISED, data: Immutable.fromJS({success: {texts: ['text']}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('texts').that.is.an.instanceof(Immutable.OrderedSet).that.contains('text')
    })
  })

  describe('imported data action', function () {

    it('should merge the images success data', function () {
      const existingState = Immutable.Map({images: Immutable.OrderedSet(), texts: Immutable.OrderedSet()})
      const action = {type: IMPORTED_DATA, data: Immutable.fromJS({success: {images: ['url']}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('images').that.is.an.instanceof(Immutable.OrderedSet).that.contains('url')
    })

    it('should merge the texts success data', function () {
      const existingState = Immutable.Map({images: Immutable.OrderedSet(), texts: Immutable.OrderedSet()})
      const action = {type: IMPORTED_DATA, data: Immutable.fromJS({success: {texts: ['text']}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('texts').that.is.an.instanceof(Immutable.OrderedSet).that.contains('text')
    })
  })

  describe('text added action', function () {

    it('should add the given message', function () {
      const existingState = Immutable.Map({images: Immutable.OrderedSet(), texts: Immutable.OrderedSet()})
      const action = {type: TEXT_ADDED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('texts').that.contains('some-message')
    })

    it('should not add the same message multiple times', function () {
      const existingState = Immutable.Map({
        images: Immutable.OrderedSet(),
        texts: Immutable.OrderedSet(['some-message'])
      })
      const action = {type: TEXT_ADDED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('texts').that.has.size(1)
    })
  })

  describe('image added action', function () {

    it('should add the given image url', function () {
      const existingState = Immutable.Map({images: Immutable.OrderedSet(), texts: Immutable.OrderedSet()})
      const action = {type: IMAGE_ADDED, url: 'some-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('images').that.contains('some-url')
    })

    it('should not add the same image url multiple times', function () {
      const existingState = Immutable.Map({
        images: Immutable.OrderedSet(['some-url']),
        texts: Immutable.OrderedSet()
      })
      const action = {type: IMAGE_ADDED, url: 'some-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('images').that.has.size(1)
    })
  })

  describe('text removed action', function () {

    it('should remove the given message', function () {
      const existingState = Immutable.Map({
        images: Immutable.OrderedSet(),
        texts: Immutable.OrderedSet(['some-message'])
      })
      const action = {type: TEXT_REMOVED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('texts').that.not.contains('some-message')
    })
  })

  describe('image removed action', function () {

    it('should remove the given message', function () {
      const existingState = Immutable.Map({
        images: Immutable.OrderedSet(['some-url']),
        texts: Immutable.OrderedSet()
      })
      const action = {type: IMAGE_REMOVED, url: 'some-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('images').that.not.contains('some-url')
    })
  })
})
