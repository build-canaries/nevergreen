import {proxyquire} from '../../../UnitSpec'
import {describe, it, before} from 'mocha'
import {expect} from 'chai'

describe('0.11.0', function () {

  let Migration, p

  before(function () {
    p = {}
    Migration = proxyquire('../../src/client/common/repo/migrations/0.11.0', {
      '../../../../../package': p
    })
  })

  it('should just return the data unmodified if it has a version >= 0.11.0', function () {
    const data = {nevergreen: {versionNumber: '0.11.0'}}
    const migrated = Migration.migrate(data)
    expect(migrated).to.equal(data)
  })

  it('should add the version number', function () {
    p.version = 'some-version'
    const migrated = Migration.migrate({})
    expect(migrated).to.have.deep.property('nevergreen.versionNumber', 'some-version')
  })

  it('should add the version name', function () {
    p.versionName = 'some-name'
    const migrated = Migration.migrate({})
    expect(migrated).to.have.deep.property('nevergreen.versionName', 'some-name')
  })

  it('should add the version meta', function () {
    p.versionMeta = 'some-meta'
    const migrated = Migration.migrate({})
    expect(migrated).to.have.deep.property('nevergreen.versionMeta', 'some-meta')
  })

  it('should add the commit hash', function () {
    p.commitHash = 'some-hash'
    const migrated = Migration.migrate({})
    expect(migrated).to.have.deep.property('nevergreen.commitHash', 'some-hash')
  })

  describe('display migration', function () {

    it('should migrate show tray name', function () {
      const migrated = Migration.migrate({display: {showTrayName: true}})
      expect(migrated).to.have.deep.property('audioVisual.showTrayNameEnabled', true)
    })

    it('should migrate show broken build timers', function () {
      const migrated = Migration.migrate({display: {showBrokenBuildTimers: true}})
      expect(migrated).to.have.deep.property('audioVisual.brokenBuildTimersEnabled', true)
    })

    it('should migrate show broken build sounds', function () {
      const migrated = Migration.migrate({display: {showBrokenBuildSounds: true}})
      expect(migrated).to.have.deep.property('audioVisual.brokenBuildSoundsEnabled', true)
    })

    it('should migrate broken build sound fx', function () {
      const migrated = Migration.migrate({display: {brokenBuildSoundFx: true}})
      expect(migrated).to.have.deep.property('audioVisual.brokenBuildSoundFx', true)
    })

    it('should delete the migrated display', function () {
      const migrated = Migration.migrate({display: {}})
      expect(migrated).to.not.have.property('display')
    })
  })

  describe('success migration', function () {

    it('should migrate text messages', function () {
      const migrated = Migration.migrate({success: {messages: ['=(^.^)=']}})
      expect(migrated).to.have.deep.property('success.texts').that.contains('=(^.^)=')
    })

    it('should migrate images', function () {
      const migrated = Migration.migrate({success: {messages: ['http://some-image-url']}})
      expect(migrated).to.have.deep.property('success.images').that.contains('http://some-image-url')
    })

    it('should delete the migrated messages', function () {
      const migrated = Migration.migrate({success: {messages: []}})
      expect(migrated).to.not.have.deep.property('success.messages')
    })
  })

  describe('trays migration', function () {

    it('should migrate trays', function () {
      const migrated = Migration.migrate({tray: {trays: {foo: 'bar'}}})
      expect(migrated).to.have.deep.property('trays.foo', 'bar')
    })

    it('should delete the migrated trays', function () {
      const migrated = Migration.migrate({tray: {trays: {foo: 'bar'}}})
      expect(migrated).to.not.have.deep.property('tray.trays')
    })

    it('should add the projects object', function () {
      const migrated = Migration.migrate({tray: {trays: {foo: 'bar'}}})
      expect(migrated).to.have.property('projects').that.deep.equals({foo: {}})
    })

    it('should add the selected object', function () {
      const migrated = Migration.migrate({tray: {trays: {foo: 'bar'}}})
      expect(migrated).to.have.property('selected').that.deep.equals({foo: []})
    })
  })
})
