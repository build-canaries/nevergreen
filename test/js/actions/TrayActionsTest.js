jest.dontMock('../../../src/js/actions/TrayActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('tray actions', () => {

  let subject, AppDispatcher, Constants, validate, projectsGateway, securityGateway, promiseMock, moment, uuid, trayStore

  beforeEach(() => {
    subject = require('../../../src/js/actions/TrayActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    validate = require('validate.js')
    projectsGateway = require('../../../src/js/gateways/projectsGateway')
    securityGateway = require('../../../src/js/gateways/securityGateway')
    moment = require('moment')
    uuid = require('node-uuid')
    trayStore = require('../../../src/js/stores/TrayStore')

    promiseMock = {
      then: jest.genMockFunction(),
      catch: jest.genMockFunction()
    }
    promiseMock.then.mockReturnValue(promiseMock)
    promiseMock.catch.mockReturnValue(promiseMock)

    projectsGateway.fetchAll.mockReturnValue(promiseMock)
    securityGateway.encryptPassword.mockReturnValue(promiseMock)
    moment.mockReturnValue({format: () => 'some-timestamp'})
  })

  describe('adding a tray', () => {
    beforeEach(() => {
      validate.mockReturnValue(undefined) // validate.js returns undefined on success
      uuid.v4.mockReturnValue('some-uuid')
    })

    it('dispatches invalid input action when validation fails', () => {
      validate.mockReturnValue('some-validation-messages')

      subject.addTray('some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: Constants.TrayInvalidInput,
        url: 'some-url',
        username: 'some-username',
        password: 'some-password',
        messages: 'some-validation-messages'
      })
    })

    it('dispatches tray add', () => {
      subject.addTray('some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: Constants.TrayAdd,
        trayId: 'some-uuid',
        url: 'some-url',
        username: 'some-username'
      })
    })

    it('dispatches password encrypted if the tray has a password', () => {
      subject.addTray('some-url', 'some-username', 'some-password')

      promiseMock.then.mock.calls[0][0]({password: 'some-encrypted-password'}) // call the callback passed to the promise mock

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: Constants.PasswordEncrypted,
        trayId: 'some-uuid',
        password: 'some-encrypted-password'
      })
    })
  })

  it('dispatches tray remove action when removing a tray', () => {
    subject.removeTray('some-id')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.TrayRemove,
      trayId: 'some-id'
    })
  })

  describe('refreshing a tray', () => {
    it('dispatches projects fetching with the tray id', () => {
      subject.refreshTray({trayId: 'some-id'})

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: Constants.ProjectsFetching,
        trayId: 'some-id'
      })
    })

    it('dispatches projects fetched action on success', () => {
      subject.refreshTray({trayId: 'some-id'})

      promiseMock.then.mock.calls[0][0]('some-projects') // call the callback passed to the promise mock

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: Constants.ProjectsFetched,
        trayId: 'some-id',
        projects: 'some-projects',
        timestamp: 'some-timestamp'
      })
    })

    it('dispatches projects fetching failed action on error', () => {
      subject.refreshTray({trayId: 'some-id'})

      promiseMock.catch.mock.calls[0][0]('some-error') // call the callback passed to the promise mock

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: Constants.ProjectsFetchError,
        trayId: 'some-id',
        error: 'some-error',
        timestamp: 'some-timestamp'
      })
    })
  })

  describe('updating a tray', () => {
    beforeEach(() => {
      trayStore.getById.mockReturnValue({password: 'existing-password'})
    })

    it('dispatches tray update with the given id', () => {
      subject.updateTray('some-id', 'some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: Constants.TrayUpdate,
        trayId: 'some-id',
        url: 'some-url',
        username: 'some-username'
      })
    })

    it('dispatches password encrypted if the tray has a password', () => {
      subject.updateTray('some-id', 'some-url', 'some-username', 'some-password')

      promiseMock.then.mock.calls[0][0]({password: 'some-encrypted-password'}) // call the callback passed to the promise mock

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: Constants.PasswordEncrypted,
        trayId: 'some-id',
        password: 'some-encrypted-password'
      })
    })

    it('does not dispatch password encrypted if the given password is the same as the current tray password', () => {
      subject.updateTray('some-id', 'some-url', 'some-username', 'existing-password')

      expect(AppDispatcher.dispatch).not.toBeCalledWith({
        type: Constants.PasswordEncrypted,
        trayId: 'some-id',
        password: 'some-encrypted-password'
      })
    })
  })

})
