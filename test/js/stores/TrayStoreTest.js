jest.dontMock('../../../src/js/stores/TrayStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('tray store', () => {

  let store, AppDispatcher, Constants, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/TrayStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: Constants.AppInit,
      configuration: {}
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('returns the storage key', () => {
    expect(store.storageKey).toBe('tray')
  })

  it('returns a validation description', () => {
    expect(store.validation).toBeTruthy()
  })

  it('adds a tray', () => {
    callback({
      type: Constants.TrayAdd,
      trayId: 'some-id',
      url: 'some-url',
      username: 'some-username'
    })
    expect(store.getById('some-id')).toEqual({
      trayId: 'some-id',
      url: 'some-url',
      username: 'some-username'
    })
  })

  describe('once a tray is added', () => {
    beforeEach(() => {
      callback({
        type: Constants.TrayAdd,
        trayId: 'some-id',
        url: 'some-url',
        username: 'some-username'
      })
    })

    it('updates a tray', () => {
      callback({
        type: Constants.TrayUpdate,
        trayId: 'some-id',
        url: 'another-url',
        username: 'another-username'
      })
      expect(store.getById('some-id')).toEqual({
        trayId: 'some-id',
        url: 'another-url',
        username: 'another-username'
      })
    })

    it('removes a tray', () => {
      callback({
        type: Constants.TrayRemove,
        trayId: 'some-id'
      })
      expect(store.getById('some-id')).toBeUndefined()
    })

    it('sets the fetching flag to true while fetching', () => {
      callback({
        type: Constants.ProjectsFetching,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeTruthy()
    })

    it('clears the error object while fetching', () => {
      callback({
        type: Constants.ProjectsFetching,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').error).toBeNull()
    })

    it('sets the fetching flag to false when fetched', () => {
      callback({
        type: Constants.ProjectsFetched,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeFalsy()
    })

    it('clears the error object once fetched', () => {
      callback({
        type: Constants.ProjectsFetched,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').error).toBeNull()
    })

    it('sets the error object on api error', () => {
      callback({
        type: Constants.ProjectsFetchError,
        trayId: 'some-id',
        error: 'some-error'
      })
      expect(store.getById('some-id').error).toEqual('some-error')
    })

    it('sets the fetching flag to false on error', () => {
      callback({
        type: Constants.ProjectsFetchError,
        trayId: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeFalsy()
    })
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: Constants.ImportedData
    })
    expect(store.getAll()).toEqual([])
  })

})
