jest.dontMock('../../../src/js/stores/InterestingProjectsStore')
  .dontMock('../../../src/js/backup/BackupActions')
  .dontMock('../../../src/js/monitor/MonitorActions')
  .dontMock('../../../src/js/NevergreenActions')

describe('success store', () => {

  let store, AppDispatcher, BackupActions, NevergreenActions, MonitorActions, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/common/AppDispatcher')
    BackupActions = require('../../../src/js/backup/BackupActions')
    NevergreenActions = require('../../../src/js/NevergreenActions')
    MonitorActions = require('../../../src/js/monitor/MonitorActions')
    store = require('../../../src/js/stores/InterestingProjectsStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: NevergreenActions.AppInit,
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
      type: BackupActions.RestoreConfiguration
    })
    expect(store.getAll()).toEqual([])
  })

})
