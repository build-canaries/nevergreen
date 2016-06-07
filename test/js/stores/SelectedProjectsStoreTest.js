jest.dontMock('../../../src/js/stores/SelectedProjectsStore')
  .dontMock('../../../src/js/tracking/TrackingActions')
  .dontMock('../../../src/js/tracking/tray/TrayActions')
  .dontMock('../../../src/js/NevergreenActions')
  .dontMock('../../../src/js/backup/BackupActions')

describe('selected projects store', () => {

  let store, AppDispatcher, TrackingActions, TrayActions, NevergreenActions, BackupActions, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    TrackingActions = require('../../../src/js/tracking/TrackingActions')
    TrayActions = require('../../../src/js/tracking/tray/TrayActions')
    NevergreenActions = require('../../../src/js/NevergreenActions')
    BackupActions = require('../../../src/js/backup/BackupActions')
    store = require('../../../src/js/stores/SelectedProjectsStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: NevergreenActions.AppInit,
      configuration: {}
    })
    callback({
      type: TrackingActions.TrayAdd,
      trayId: 'some-id'
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('concatenates selected project ids', () => {
    callback({
      type: TrayActions.ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    callback({
      type: TrayActions.ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-2']
    })
    expect(store.getForTray('some-id')).toEqual(['id-1', 'id-2'])
  })

  it('removes unselected projects', () => {
    callback({
      type: TrayActions.ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    callback({
      type: TrayActions.ProjectUnselected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    expect(store.getForTray('some-id')).toEqual([])
  })

  it('restores the state from configuration', () => {
    callback({
      type: BackupActions.RestoreConfiguration,
      configuration: {selectedProjects: 'some-configuration'}
    })
    expect(store.getAll()).toEqual('some-configuration')
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })

    it('returns an error message if the storage key is not an object', () => {
      const obj = {
        selectedProjects: 'not-an-object'
      }
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })
  })
})
