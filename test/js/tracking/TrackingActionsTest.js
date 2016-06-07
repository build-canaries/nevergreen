jest.dontMock('../../../src/js/tracking/TrackingActions')

describe('tracking actions', () => {

  let subject, AppDispatcher, projectsGateway, securityGateway, promiseMock, moment, uuid, trayStore, Helpers

  beforeEach(() => {
    Helpers = require('../jest/Helpers')
    subject = require('../../../src/js/tracking/TrackingActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    projectsGateway = require('../../../src/js/gateways/projectsGateway')
    securityGateway = require('../../../src/js/gateways/securityGateway')
    moment = require('moment')
    uuid = require('node-uuid')
    trayStore = require('../../../src/js/stores/TrayStore')

    promiseMock = Helpers.promiseMock()

    projectsGateway.fetchAll.mockReturnValue(promiseMock)
    securityGateway.encryptPassword.mockReturnValue(promiseMock)
    moment.mockReturnValue({format: () => 'some-timestamp'})
  })

  describe('adding a tray', () => {
    beforeEach(() => {
      uuid.v4.mockReturnValue('some-uuid')
      subject.refreshTray = jest.genMockFunction()
    })

    it('dispatches tray add', () => {
      subject.addTray('http://some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.TrayAdd,
        trayId: 'some-uuid',
        url: 'http://some-url',
        username: 'some-username'
      })
    })

    it('adds the http scheme if no scheme is given', () => {
      subject.addTray('some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).toBeCalledWith(jasmine.objectContaining({
        url: 'http://some-url'
      }))
    })

    xit('refreshes the tray with the username even if a blank password is given', () => {
      subject.addTray('http://some-url', 'some-username', '')

      expect(subject.refreshTray).toBeCalledWith({
        trayId: 'some-uuid',
        url: 'http://some-url',
        username: 'some-username'
      })
    })

    it('dispatches password encrypted if the tray has a password', () => {
      subject.addTray('http://some-url', 'some-username', 'some-password')

      promiseMock.then.mock.calls[0][0]({password: 'some-encrypted-password'}) // call the callback passed to the promise mock

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.PasswordEncrypted,
        trayId: 'some-uuid',
        password: 'some-encrypted-password'
      })

      // expect(subject.refreshTray).toBeCalledWith(jasmine.objectContaining({
      //   password: 'some-encrypted-password'
      // }))
    })
  })

  it('dispatches tray remove action when removing a tray', () => {
    subject.removeTray('some-id')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.TrayRemove,
      trayId: 'some-id'
    })
  })

  describe('refreshing a tray', () => {
    it('dispatches projects fetching with the tray id', () => {
      subject.refreshTray({trayId: 'some-id'})

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.ProjectsFetching,
        trayId: 'some-id'
      })
    })

    it('dispatches projects fetched action on success', () => {
      subject.refreshTray({trayId: 'some-id'})

      promiseMock.then.mock.calls[0][0]('some-projects') // call the callback passed to the promise mock

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.ProjectsFetched,
        trayId: 'some-id',
        projects: 'some-projects',
        timestamp: 'some-timestamp'
      })
    })

    it('dispatches projects fetching failed action on error', () => {
      subject.refreshTray({trayId: 'some-id'})

      promiseMock.catch.mock.calls[0][0]('some-error') // call the callback passed to the promise mock

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.ProjectsFetchError,
        trayId: 'some-id',
        error: 'some-error',
        timestamp: 'some-timestamp'
      })
    })
  })

  describe('updating a tray', () => {
    beforeEach(() => {
      trayStore.getById.mockReturnValue({password: 'existing-password'})
      subject.refreshTray = jest.genMockFunction()
    })

    it('dispatches tray update with the given id', () => {
      subject.updateTray('some-id', 'some-name', 'some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.TrayUpdate,
        trayId: 'some-id',
        name: 'some-name',
        url: 'some-url',
        username: 'some-username'
      })
    })

    it('dispatches password encrypted if the tray has a new different password', () => {
      subject.updateTray('some-id', 'some-name', 'some-url', 'some-username', 'some-password')

      promiseMock.then.mock.calls[0][0]({password: 'some-encrypted-password'}) // call the callback passed to the promise mock

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.PasswordEncrypted,
        trayId: 'some-id',
        password: 'some-encrypted-password'
      })

      // expect(subject.refreshTray).toBeCalledWith({
      //   trayId: 'some-id',
      //   url: 'some-url',
      //   username: 'some-username',
      //   password: 'some-encrypted-password'
      // })
    })

    it('does not dispatch password encrypted if the given password is the same as the current password', () => {
      subject.updateTray('some-id', 'some-name', 'some-url', 'some-username', 'existing-password')

      expect(AppDispatcher.dispatch).not.toBeCalledWith({
        type: subject.PasswordEncrypted,
        trayId: 'some-id',
        password: 'some-encrypted-password'
      })

      // expect(subject.refreshTray).toBeCalledWith({
      //   trayId: 'some-id',
      //   url: 'some-url',
      //   username: 'some-username',
      //   password: 'existing-password'
      // })
    })

    it('allows the password to be unset aka updated to blank', () => {
      subject.updateTray('some-id', 'some-name', 'some-url', 'some-username', '')

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.PasswordEncrypted,
        trayId: 'some-id',
        password: ''
      })

      // expect(subject.refreshTray).toBeCalledWith({
      //   trayId: 'some-id',
      //   url: 'some-url',
      //   username: 'some-username',
      //   password: ''
      // })
    })
  })

})
