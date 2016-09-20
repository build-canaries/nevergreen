import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit} from '../../../src/client/NevergreenActions'
import {
  BrokenBuildTimersChanged,
  TrayNameToggled,
  BrokenBuildSoundsToggled,
  BrokenBuildSoundFx
} from '../../../src/client/audio-visual/AudioVisualActions'

describe('display store', () => {

  let AppDispatcher, subject, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/client/stores/DisplayStore', {'../common/AppDispatcher': AppDispatcher})

    callback = AppDispatcher.register.getCall(0).args[0]
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()

    callback({
      type: AppInit,
      configuration: {}
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register).to.have.been.called
  })

  describe('are broken build timers enabled', () => {
    it('returns false by default', () => {
      expect(subject.areBrokenBuildTimersEnabled()).to.be.false
    })

    it('returns true when the callback changes the value to true', () => {
      callback({
        type: BrokenBuildTimersChanged,
        value: true
      })

      expect(subject.areBrokenBuildTimersEnabled()).to.be.true
    })

    it('return false when the callback changes the value to anything else', () => {
        callback({
          type: BrokenBuildTimersChanged,
          value: 'a string'
        })
        expect(subject.areBrokenBuildTimersEnabled()).to.be.false
      }
    )
  })

  describe('are tray name toggled', () => {
    it('returns false by default', () => {
      expect(subject.areTrayNameEnabled()).to.be.false
    })

    it('returns true when the callback changes the value to true', () => {
      callback({
        type: TrayNameToggled,
        value: true
      })

      expect(subject.areTrayNameEnabled()).to.be.true
    })

    it('return false when the callback changes the value to anything else', () => {
        callback({
          type: TrayNameToggled,
          value: 'a string'
        })
        expect(subject.areTrayNameEnabled()).to.be.false
      }
    )
  })

  describe('are broken build sounds enabled', () => {

    it('disables broken build sounds by default', () => {
      expect(subject.areBrokenBuildSoundsEnabled()).to.be.false
    })

    it('enables broken builds when callback changes value to true', () => {
      callback({
        type: BrokenBuildSoundsToggled,
        value: true
      })
      expect(subject.areBrokenBuildSoundsEnabled()).to.be.true
    })

    it('disables broken builds when callbak changes value to false', () => {
      callback({
        type: BrokenBuildSoundsToggled,
        value: false
      })
      expect(subject.areBrokenBuildSoundsEnabled()).to.be.false
    })
  })

  describe('broken build sound fx', () => {
    // TODO: tests ignore .mp3 imports, need to figure out how to test this
    it.skip('defaults to the included pacman death sound', () => {
      expect(subject.brokenBuildSoundFx()).to.equal('pacman_death.mp3')
    })

    it('sets the value', () => {
      callback({
        type: BrokenBuildSoundFx,
        value: 'some-url'
      })
      expect(subject.brokenBuildSoundFx()).to.equal('some-url')
    })
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(subject.validate(obj)).to.deep.equal(['The top level key display is missing!'])
    })
  })
})
