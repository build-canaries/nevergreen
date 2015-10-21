jest.dontMock('../../../src/js/actions/TrayActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')
  .dontMock('validate.js')

describe('tray actions', function () {

  var subject, AppDispatcher, Constants, projectsGateway, securityGateway, promiseMock, uuid

  beforeEach(function () {
    subject = require('../../../src/js/actions/TrayActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    projectsGateway = require('../../../src/js/gateways/projectsGateway')
    securityGateway = require('../../../src/js/gateways/securityGateway')
    uuid = require('node-uuid')
    promiseMock = {
      then: jest.genMockFunction()
    }
  })

  it('dispatches invalid input action when tray url is blank', function () {
    subject.addTray('', null, null)

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.TrayInvalidInput,
      url: '',
      username: null,
      password: null,
      messages: ['Url can\'t be blank']
    })
  })

  it('dispatches invalid input action when tray url is not a valid url', function () {
    subject.addTray('not-a-valid-url', null, null)

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.TrayInvalidInput,
      url: 'not-a-valid-url',
      username: null,
      password: null,
      messages: ['Url is not a valid url']
    })
  })
})
