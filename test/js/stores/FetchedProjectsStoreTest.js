jest.dontMock('../../../src/js/stores/FetchedProjectsStore')
  .dontMock('../../../src/js/backup/BackupActions')
  .dontMock('../../../src/js/tracking/TrackingActions')
  .dontMock('../../../src/js/NevergreenActions')

describe('fetched projects store', () => {

  let store, AppDispatcher, BackupActions, TrackingActions, NevergreenActions, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    TrackingActions = require('../../../src/js/tracking/TrackingActions')
    BackupActions = require('../../../src/js/backup/BackupActions')
    NevergreenActions = require('../../../src/js/NevergreenActions')
    store = require('../../../src/js/stores/FetchedProjectsStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: NevergreenActions.AppInit,
      configuration: {}
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('returns undefined for unknown tray ids', () => {
    expect(store.getAll('some-id')).toBeUndefined()
  })

  it('creates an empty seq of fetched projects when a tray is added', () => {
    callback({
      type: TrackingActions.TrayAdd,
      trayId: 'some-id'
    })
    expect(store.getAll('some-id')).toEqual([])
  })

  it('restores the state from configuration', () => {
    callback({
      type: BackupActions.RestoreConfiguration,
      configuration: {fetchedProjects: {someId: 'some-configuration'}}
    })
    expect(store.getAll('someId')).toEqual('some-configuration')
  })

  describe('adding fetched projects', () => {

    beforeEach(() => {
      callback({
        type: TrackingActions.TrayAdd,
        trayId: 'some-id'
      })
    })

    it('filters out jobs', () => {
      callback({
        type: TrackingActions.ProjectsFetched,
        trayId: 'some-id',
        projects: [{
          projectId: 'some-project-id',
          name: 'name',
          stage: 'stage',
          job: null
        }, {
          projectId: 'another-project-id',
          name: 'something-else',
          stage: 'stage',
          job: 'job'
        }]
      })
      expect(store.getAll('some-id')).toEqual([{
        projectId: 'some-project-id',
        name: 'name stage',
        isNew: true,
        wasRemoved: false
      }])
    })

    describe('with previous projects added', () => {
      beforeEach(() => {
        callback({
          type: TrackingActions.ProjectsFetched,
          trayId: 'some-id',
          projects: [{
            projectId: 'some-project-id',
            name: 'name',
            stage: 'stage',
            job: null
          }]
        })
      })

      it('removes the new flag if the same project is fetched again', () => {
        callback({
          type: TrackingActions.ProjectsFetched,
          trayId: 'some-id',
          projects: [{
            projectId: 'some-project-id',
            name: 'name',
            stage: 'stage',
            job: null
          }]
        })
        expect(store.getAll('some-id')).toEqual([{
          projectId: 'some-project-id',
          name: 'name stage',
          isNew: false,
          wasRemoved: false
        }])
      })

      it('sets the removed flag if the project is not fetched again', () => {
        callback({
          type: TrackingActions.ProjectsFetched,
          trayId: 'some-id',
          projects: []
        })
        expect(store.getAll('some-id')).toEqual([{
          projectId: 'some-project-id',
          name: 'name stage',
          isNew: false,
          wasRemoved: true
        }])
      })
    })
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })

    it('returns an error message if the storage key is not an object', () => {
      const obj = {
        fetchedProjects: 'not-an-object'
      }
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })
  })

})
