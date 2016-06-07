jest.dontMock('../../src/js/NevergreenActions')

describe('nevergreen actions', () => {
  let subject, AppDispatcher, gateway, helpers, promiseMock, semver

  beforeEach(() => {
    helpers = require('./jest/Helpers')
    subject = require('../../src/js/NevergreenActions')
    AppDispatcher = require('../../src/js/dispatcher/AppDispatcher')
    gateway = require('../../src/js/gateways/gateway')
    semver = require('semver')

    promiseMock = helpers.promiseMock()
    gateway.get.mockReturnValue(promiseMock)
  })

  describe('a new version is available', () => {
    beforeEach(() => {
      semver.gt.mockReturnValue(true)

      subject.checkForNewVersion('0.1.0', 'nevergreen.io')

      // call the callback passed to the gateway promise
      promiseMock.then.mock.calls[0][0]({
        tag_name: 'some-version'
      })
    })

    it('dispatches an action with the new version', () => {
      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.Notification,
        message: jasmine.stringMatching('some-version')
      })
    })

    it('dispatches an action mentioning refreshing if on nevergreen.io', () => {
      expect(AppDispatcher.dispatch).toBeCalledWith(jasmine.objectContaining({
        message: jasmine.stringMatching('refresh')
      }))
    })
  })

  it('dispatches an action mentioning GitHub if self hosting', () => {
    semver.gt.mockReturnValue(true)
    subject.checkForNewVersion('0.1.0', 'my-internal-server-name')

    // call the callback passed to the gateway promise
    promiseMock.then.mock.calls[0][0]({
      tag_name: 'some-version'
    })

    expect(AppDispatcher.dispatch).toBeCalledWith(jasmine.objectContaining({
      message: jasmine.stringMatching('GitHub')
    }))
  })

  it('does not dispatches an action if you are on the latest version', () => {
    semver.gt.mockReturnValue(false)

    subject.checkForNewVersion('0.1.0')

    // call the callback passed to the gateway promise
    promiseMock.then.mock.calls[0][0]({
      tag_name: 'some-version'
    })

    expect(AppDispatcher.dispatch).not.toBeCalled()
  })

  it('dispatches a dismiss notification action', () => {
    subject.dismiss()

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.NotificationDismiss
    })
  })
})
