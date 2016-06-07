jest.dontMock('../../../src/js/stores/TrayStore')
  .dontMock('../../../src/js/tracking/TrackingActions')
  .dontMock('../../../src/js/NevergreenActions')
  .dontMock('../../../src/js/backup/BackupActions')

describe('tray store', () => {

  let store, AppDispatcher, TrackingActions, NevergreenActions, BackupActions, callback, nameGenerator

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    TrackingActions = require('../../../src/js/tracking/TrackingActions')
    NevergreenActions = require('../../../src/js/NevergreenActions')
    BackupActions = require('../../../src/js/backup/BackupActions')
    store = require('../../../src/js/stores/TrayStore')
    nameGenerator = require('project-name-generator')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: NevergreenActions.AppInit,
      configuration: {}
    })

    nameGenerator.mockReturnValue({
      spaced: 'some generated name'
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('adds a tray', () => {
    callback({
      type: TrackingActions.TrayAdd,
      trayId: 'some-id',
      url: 'some-url',
      username: 'some-username'
    })
    expect(store.getById('some-id')).toEqual({
      trayId: 'some-id',
      name: 'Some Generated Name',
      url: 'some-url',
      username: 'some-username'
    })
  })

  describe('once a tray is added', () => {
    beforeEach(() => {
      callback({
        type: TrackingActions.TrayAdd,
        trayId: 'some-id',
        url: 'some-url',
        username: 'some-username'
      })
    })

    it('updates a tray', () => {
      callback({
        type: TrackingActions.TrayUpdate,
        trayId: 'some-id',
        name: 'some-name',
        url: 'another-url',
        username: 'another-username'
      })
      expect(store.getById('some-id')).toEqual({
        trayId: 'some-id',
        name: 'some-name',
        url: 'another-url',
        username: 'another-username'
      })
    })

    it('removes a tray', () => {
      callback({
        type: TrackingActions.TrayRemove,
        trayId: 'some-id'
      })
      expect(store.getById('some-id')).toBeUndefined()
    })

    it('sets the fetching flag to true while fetching', () => {
      callback({
        type: TrackingActions.ProjectsFetching,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeTruthy()
    })

    it('clears the error object while fetching', () => {
      callback({
        type: TrackingActions.ProjectsFetching,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').error).toBeNull()
    })

    it('sets the fetching flag to false when fetched', () => {
      callback({
        type: TrackingActions.ProjectsFetched,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeFalsy()
    })

    it('clears the error object once fetched', () => {
      callback({
        type: TrackingActions.ProjectsFetched,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').error).toBeNull()
    })

    it('sets the error object on api error', () => {
      callback({
        type: TrackingActions.ProjectsFetchError,
        trayId: 'some-id',
        error: 'some-error'
      })
      expect(store.getById('some-id').error).toEqual('some-error')
    })

    it('sets the fetching flag to false on error', () => {
      callback({
        type: TrackingActions.ProjectsFetchError,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeFalsy()
    })
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: BackupActions.ImportedData
    })
    expect(store.getAll()).toEqual([])
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })

    it('returns an error message if the trays key does not exist', () => {
      const obj = {
        success: {}
      }
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })

    it('returns an error message if the trays key is not an object', () => {
      const obj = {
        success: {
          trays: 'not-an-object'
        }
      }
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })
  })

})
