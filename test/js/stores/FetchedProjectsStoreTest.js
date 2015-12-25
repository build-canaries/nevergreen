jest.dontMock('../../../src/js/stores/FetchedProjectsStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('fetched projects store', () => {

  let store, AppDispatcher, Constants, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/FetchedProjectsStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({type: Constants.AppInit})
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('returns undefined for unknown tray ids', () => {
    expect(store.getAll('some-id')).toBeUndefined()
  })

  it('creates an empty seq of fetched projects when a tray is added', () => {
    callback({
      type: Constants.TrayAdd,
      trayId: 'some-id'
    })
    expect(store.getAll('some-id')).toEqual([])
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: Constants.TrayAdd,
      trayId: 'some-id'
    })
    callback({
      type: Constants.ImportedData
    })
    expect(store.getAll('some-id')).toBeUndefined()
  })

  describe('adding fetched projects', () => {

    beforeEach(() => {
      callback({
        type: Constants.TrayAdd,
        trayId: 'some-id'
      })
    })

    it('filters out jobs', () => {
      callback({
        type: Constants.ProjectsFetched,
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
        name: 'name [stage]',
        isNew: true,
        wasRemoved: false
      }])
    })

    describe('with previous projects added', () => {
      beforeEach(() => {
        callback({
          type: Constants.ProjectsFetched,
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
          type: Constants.ProjectsFetched,
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
          name: 'name [stage]',
          isNew: false,
          wasRemoved: false
        }])
      })

      it('sets the removed flag if the project is not fetched again', () => {
        callback({
          type: Constants.ProjectsFetched,
          trayId: 'some-id',
          projects: []
        })
        expect(store.getAll('some-id')).toEqual([{
          projectId: 'some-project-id',
          name: 'name [stage]',
          isNew: false,
          wasRemoved: true
        }])
      })
    })
  })

})
