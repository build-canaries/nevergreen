jest.dontMock('../../../../src/js/tracking/tray/TrayActions')

describe('tray actions', () => {

  let subject, AppDispatcher

  beforeEach(() => {
    subject = require('../../../../src/js/tracking/tray/TrayActions')
    AppDispatcher = require('../../../../src/js/dispatcher/AppDispatcher')
  })

  it('dispatches a project selected action', () => {
    subject.selectProject('some-tray-id', ['some-project-id'])

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.ProjectSelected,
      trayId: 'some-tray-id',
      projectIds: ['some-project-id']
    })
  })

  it('dispatches a project unselected action', () => {
    subject.removeProject('some-tray-id', ['some-project-id'])

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.ProjectUnselected,
      trayId: 'some-tray-id',
      projectIds: ['some-project-id']
    })
  })
})
