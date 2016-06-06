jest.dontMock('../../../src/js/monitor/MonitorActions')

describe('interesting actions', () => {

  let subject, AppDispatcher, projectsGateway, promiseMock

  beforeEach(() => {
    subject = require('../../../src/js/monitor/MonitorActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    projectsGateway = require('../../../src/js/gateways/projectsGateway')
    promiseMock = {
      then: jest.genMockFunction(),
      catch: jest.genMockFunction()
    }
    promiseMock.then.mockReturnValue(promiseMock)
    promiseMock.catch.mockReturnValue(promiseMock)
  })

  it('calls the projects gateway', () => {
    projectsGateway.interesting.mockReturnValueOnce(promiseMock)

    subject.fetchInteresting('some-trays', 'some-selected-projects')

    expect(projectsGateway.interesting).toBeCalledWith('some-trays', 'some-selected-projects')
  })

  it('dispatches a interesting projects action', () => {
    projectsGateway.interesting.mockReturnValueOnce(promiseMock)

    subject.fetchInteresting('irrelevant', 'irrelevant')

    const callback = promiseMock.then.mock.calls[0][0]

    callback('the-data')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.InterestingProjects,
      projects: 'the-data'
    })
  })

  it('dispatches a interesting projects error action', () => {
    projectsGateway.interesting.mockReturnValueOnce(promiseMock)

    subject.fetchInteresting('irrelevant', 'irrelevant')

    const callback = promiseMock.catch.mock.calls[0][0]

    callback('the-error')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.InterestingProjectsError,
      error: 'the-error'
    })
  })
})
