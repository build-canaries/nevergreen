import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('audio visual actions', () => {
  let subject, AppDispatcher

  before(() => {
    AppDispatcher = {}
    subject = proxyquire('../../../src/client/audio-visual/AudioVisualActions', {'../common/AppDispatcher': AppDispatcher})
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
  })

  it('dispatches an action for broken build timers', () => {
    subject.setBrokenBuildTimers('some-value')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.BrokenBuildTimersChanged,
      value: 'some-value'
    })
  })

  it('dispatches an action for tray name toggled', () => {
    subject.setTrayNameToggled('some-value')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.TrayNameToggled,
      value: 'some-value'
    })
  })

  it('dispatches an action for the broken build sounds toggled', () => {
    subject.setBrokenBuildSounds('toggle on')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.BrokenBuildSoundsToggled,
      value: 'toggle on'
    })
  })

  it('dispatches an action for the broken build sound fx', () => {
    subject.setBrokenBuildSoundFx('some-url')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.BrokenBuildSoundFx,
      value: 'some-url'
    })
  })
})
