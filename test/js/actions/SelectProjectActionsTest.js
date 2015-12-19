jest.dontMock('../../../src/js/actions/SelectProjectActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('select actions', () => {

  let subject, AppDispatcher, Constants

  beforeEach(() => {
    subject = require('../../../src/js/actions/SelectProjectActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
  })

  it('dispatches a project selected action', () => {
    subject.selectProject('some-tray-id', ['some-project-id'])

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.ProjectSelected,
      trayId: 'some-tray-id',
      projectIds: ['some-project-id']
    })
  })

  it('dispatches a project unselected action', () => {
    subject.removeProject('some-tray-id', ['some-project-id'])

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.ProjectUnselected,
      trayId: 'some-tray-id',
      projectIds: ['some-project-id']
    })
  })
})
