jest.dontMock('../../../src/js/stores/SelectedProjectsStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('success store', function () {

  var store, AppDispatcher, Constants, callback

  beforeEach(function () {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/SelectedProjectsStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: Constants.TrayAdd,
      trayId: 'some-id'
    })
  })

  it('registers a callback with the dispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('concatenates selected project ids', function () {
    callback({
      type: Constants.ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    callback({
      type: Constants.ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-2']
    })
    expect(store.getForTray('some-id')).toEqual(['id-1', 'id-2'])
  })

  it('removes unselected projects', function () {
    callback({
      type: Constants.ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    callback({
      type: Constants.ProjectUnselected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    expect(store.getForTray('some-id')).toEqual([])
  })

  it('clears the store state when new data is imported', function () {
    callback({
      type: Constants.ImportedData
    })
    expect(store.getAll()).toEqual({})
  })

})