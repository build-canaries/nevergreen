jest.dontMock('../../../src/js/stores/InterestingProjectsStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('success store', function () {

  var store, AppDispatcher, Constants, callback

  beforeEach(function () {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/InterestingProjectsStore')
    callback = AppDispatcher.register.mock.calls[0][0]
  })

  it('registers a callback with the dispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('adds empty projects', function () {
    callback({
      type: Constants.InterestingProjects,
      projects: []
    })
    expect(store.getAll()).toEqual([])
  })

  it('adds a project', function () {
    callback({
      type: Constants.InterestingProjects,
      projects: [{
        projectId: 'some-id',
        name: 'name',
        stage: 'stage',
        prognosis: 'some-prognosis',
        lastBuildTime: 'some-last-build-time'
      }]
    })
    expect(store.getAll()).toEqual([{
      projectId: 'some-id',
      name: 'name [stage]',
      prognosis: 'some-prognosis',
      lastBuildTime: 'some-last-build-time'
    }])
  })

  it('adds an error', function () {
    callback({
      type: Constants.InterestingProjectsError,
      error: 'some-error'
    })
    expect(store.getLastError()).toEqual('some-error')
  })

  it('clears the store state when new data is imported', function () {
    callback({
      type: Constants.ImportedData
    })
    expect(store.getAll()).toEqual([])
  })

})