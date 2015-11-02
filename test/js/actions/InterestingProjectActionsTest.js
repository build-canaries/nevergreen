jest.dontMock('../../../src/js/actions/InterestingProjectActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('interesting actions', function () {

  var subject, AppDispatcher, Constants, projectsGateway, promiseMock

  beforeEach(function () {
    subject = require('../../../src/js/actions/InterestingProjectActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    projectsGateway = require('../../../src/js/gateways/projectsGateway')
    promiseMock = {
      then: jest.genMockFunction(),
      catch: jest.genMockFunction()
    }
    promiseMock.then.mockReturnValue(promiseMock)
    promiseMock.catch.mockReturnValue(promiseMock)
  })

  it('calls the projects gateway', function () {
    projectsGateway.interesting.mockReturnValueOnce(promiseMock)

    subject.fetchInteresting('some-trays', 'some-selected-projects')

    expect(projectsGateway.interesting).toBeCalledWith('some-trays', 'some-selected-projects')
  })

  it('dispatches a interesting projects action', function () {
    projectsGateway.interesting.mockReturnValueOnce(promiseMock)

    subject.fetchInteresting('irrelevant', 'irrelevant')

    var callback = promiseMock.then.mock.calls[0][0]

    callback('the-data')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.InterestingProjects,
      projects: 'the-data'
    })
  })

  it('dispatches a interesting projects error action', function () {
    projectsGateway.interesting.mockReturnValueOnce(promiseMock)

    subject.fetchInteresting('irrelevant', 'irrelevant')

    var callback = promiseMock.catch.mock.calls[0][0]

    callback('the-error')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.InterestingProjectsError,
      error: 'the-error'
    })
  })
})
