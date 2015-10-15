jest.dontMock('../../../src/js/stores/TrayStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('success store', function () {

  var store, AppDispatcher, Constants, callback

  beforeEach(function () {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/TrayStore')
    callback = AppDispatcher.register.mock.calls[0][0]
  })

  it('registers a callback with the dispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('adds a tray', function () {
    callback({
      type: Constants.TrayAdd,
      id: 'some-id',
      url: 'some-url',
      username: 'some-username'
    })
    expect(store.getById('some-id')).toEqual({
      id: 'some-id',
      url: 'some-url',
      username: 'some-username'
    })
  })

  describe('once a tray is added', function () {
    beforeEach(function () {
      callback({
        type: Constants.TrayAdd,
        id: 'some-id',
        url: 'some-url',
        username: 'some-username'
      })
    })

    it('removes a tray', function () {
      callback({
        type: Constants.TrayRemove,
        id: 'some-id'
      })
      expect(store.getById('some-id')).toBeUndefined()
    })

    it('sets the fetching flag to true while fetching', function () {
      callback({
        type: Constants.ProjectsFetching,
        id: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeTruthy()
    })

    it('clears the error object while fetching', function () {
      callback({
        type: Constants.ProjectsFetching,
        id: 'some-id'
      })
      expect(store.getById('some-id').error).toBeNull()
    })

    it('sets the fetching flag to false when fetched', function () {
      callback({
        type: Constants.ProjectsFetched,
        id: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeFalsy()
    })

    it('clears the error object once fetched', function () {
      callback({
        type: Constants.ProjectsFetched,
        id: 'some-id'
      })
      expect(store.getById('some-id').error).toBeNull()
    })

    it('sets the error object on api error', function () {
      callback({
        type: Constants.ApiError,
        id: 'some-id',
        error: 'some-error'
      })
      expect(store.getById('some-id').error).toEqual('some-error')
    })

    it('sets the fetching flag to false on error', function () {
      callback({
        type: Constants.ApiError,
        id: 'some-id'
      })
      expect(store.getById('some-id').fetching).toBeFalsy()
    })
  })

  it('clears the store state when new data is imported', function () {
    callback({
      type: Constants.ImportedData
    })
    expect(store.getAll()).toEqual({})
  })

})