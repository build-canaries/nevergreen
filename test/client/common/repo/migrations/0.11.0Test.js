import {describe, it} from 'mocha'
import {expect} from 'chai'
import {migrate} from '../../../../../src/client/common/repo/migrations/0.11.0'

describe('0.11.0', function () {
  it('should just return the data unmodified if it has a version >= 0.11.0', function () {
    const data = {nevergreen: {versionNumber: '0.11.0'}}
    const migrated = migrate(data)
    expect(migrated).to.equal(data)
  })

  it('should add the version number', function () {
    const migrated = migrate({})
    expect(migrated).to.have.nested.property('nevergreen.versionNumber', '0.11.0')
  })

  describe('display migration', function () {

    it('should migrate show tray name', function () {
      const migrated = migrate({display: {showTrayName: true}})
      expect(migrated).to.have.nested.property('audioVisual.showTrayName', true)
    })

    it('should migrate show broken build timers', function () {
      const migrated = migrate({display: {showBrokenBuildTimers: true}})
      expect(migrated).to.have.nested.property('audioVisual.showBrokenBuildTime', true)
    })

    it('should migrate show broken build sounds', function () {
      const migrated = migrate({display: {showBrokenBuildSounds: true}})
      expect(migrated).to.have.nested.property('audioVisual.playBrokenBuildSoundFx', true)
    })

    it('should migrate broken build sound fx', function () {
      const migrated = migrate({display: {brokenBuildSoundFx: true}})
      expect(migrated).to.have.nested.property('audioVisual.brokenBuildSoundFx', true)
    })

    it('should delete the migrated display', function () {
      const migrated = migrate({display: {}})
      expect(migrated).to.not.have.property('display')
    })
  })

  describe('success migration', function () {

    it('should migrate messages', function () {
      const migrated = migrate({success: {messages: ['=(^.^)=']}})
      expect(migrated).to.have.property('success').that.contains('=(^.^)=')
    })

    it('should delete the migrated messages', function () {
      const migrated = migrate({success: {messages: []}})
      expect(migrated).to.not.have.nested.property('success.messages')
    })
  })

  describe('trays migration', function () {

    it('should use the tray url as the key', function () {
      const migrated = migrate({tray: {trays: {someId: {url: 'someUrl'}}}})
      expect(migrated).to.have.nested.property('trays.someUrl')
    })

    it('should update the tray id', function () {
      const migrated = migrate({tray: {trays: {someId: {url: 'someUrl', trayId: 'someId'}}}})
      expect(migrated).to.have.nested.property('trays.someUrl').that.has.property('trayId', 'someUrl')
    })

    it('should delete the migrated trays', function () {
      const migrated = migrate({tray: {trays: {foo: 'bar'}}})
      expect(migrated).to.not.have.nested.property('tray.trays')
    })

    it('should add the projects object', function () {
      const migrated = migrate({tray: {trays: {someId: {url: 'someUrl'}}}})
      expect(migrated).to.have.property('projects').that.deep.equals({someUrl: {}})
    })

    it('should add the selected object', function () {
      const migrated = migrate({tray: {trays: {someId: {url: 'someUrl'}}}})
      expect(migrated).to.have.property('selected').that.deep.equals({someUrl: []})
    })
  })
})
