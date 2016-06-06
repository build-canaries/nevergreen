jest.dontMock('../../../src/js/stores/InterestingProjectsStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')
  .dontMock('../../../src/js/monitor/MonitorActions')

describe('success store', () => {

  let store, AppDispatcher, Constants, MonitorActions, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    MonitorActions = require('../../../src/js/monitor/MonitorActions')
    store = require('../../../src/js/stores/InterestingProjectsStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: Constants.AppInit,
      configuration: {}
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('adds empty projects', () => {
    callback({
      type: MonitorActions.InterestingProjects,
      projects: []
    })
    expect(store.getAll()).toEqual([])
  })

  it('adds a project', () => {
    callback({
      type: MonitorActions.InterestingProjects,
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
      name: 'name stage',
      prognosis: 'some-prognosis',
      lastBuildTime: 'some-last-build-time'
    }])
  })

  it('adds an error', () => {
    callback({
      type: MonitorActions.InterestingProjectsError,
      error: 'some-error'
    })
    expect(store.getLastError()).toEqual('some-error')
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: Constants.RestoreConfiguration
    })
    expect(store.getAll()).toEqual([])
  })

})
