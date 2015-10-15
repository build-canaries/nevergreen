jest.dontMock('../../../src/js/stores/FetchedProjectsStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('fetched projects store', function () {

  var store, AppDispatcher, Constants, callback

  beforeEach(function () {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/FetchedProjectsStore')
    callback = AppDispatcher.register.mock.calls[0][0]
  })

  it('registers a callback with the dispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('creates an empty seq by default', function () {
    expect(store.getAll('some-id')).toEqual([])
  })

  it('creates an empty seq of fetched projects when a tray is added', function () {
    callback({
      type: Constants.TrayAdd,
      id: 'some-id'
    })
    expect(store.getAll('some-id')).toEqual([])
  })

  it('clears the store state when new data is imported', function () {
    callback({
      type: Constants.ImportedData
    })
    expect(store.getAll('some-id')).toEqual([])
  })

  describe('adding fetched projects', function () {

    beforeEach(function () {
      callback({
        type: Constants.TrayAdd,
        id: 'some-id'
      })
    })

    it('filters out jobs', function () {
      callback({
        type: Constants.ProjectsFetched,
        id: 'some-id',
        projects: [{
          'project-id': 'some-project-id',
          name: 'name',
          stage: 'stage',
          job: null
        }, {
          'project-id': 'another-project-id',
          name: 'something-else',
          stage: 'stage',
          job: 'job'
        }]
      })
      expect(store.getAll('some-id')).toEqual([{
        id: 'some-project-id',
        name: 'name [stage]',
        isNew: true,
        wasRemoved: false
      }])
    })

    describe('with previous projects added', function () {
      beforeEach(function () {
        callback({
          type: Constants.ProjectsFetched,
          id: 'some-id',
          projects: [{
            'project-id': 'some-project-id',
            name: 'name',
            stage: 'stage',
            job: null
          }]
        })
      })

      it('removes the new flag if the same project is fetched again', function () {
        callback({
          type: Constants.ProjectsFetched,
          id: 'some-id',
          projects: [{
            'project-id': 'some-project-id',
            name: 'name',
            stage: 'stage',
            job: null
          }]
        })
        expect(store.getAll('some-id')).toEqual([{
          id: 'some-project-id',
          name: 'name [stage]',
          isNew: false,
          wasRemoved: false
        }])
      })

      it('sets the removed flag if the project is not fetched again', function () {
        callback({
          type: Constants.ProjectsFetched,
          id: 'some-id',
          projects: []
        })
        expect(store.getAll('some-id')).toEqual([{
          id: 'some-project-id',
          name: 'name [stage]',
          isNew: false,
          wasRemoved: true
        }])
      })
    })
  })

})