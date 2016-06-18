import '../../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('tray actions', () => {

  let subject, AppDispatcher

  before(() => {
    AppDispatcher = {}
    subject = proxyquire('../../../../src/client/tracking/tray/TrayActions', {'../../common/AppDispatcher': AppDispatcher})
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
  })

  it('dispatches a project selected action', () => {
    subject.selectProject('some-tray-id', ['some-project-id'])

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.ProjectSelected,
      trayId: 'some-tray-id',
      projectIds: ['some-project-id']
    })
  })

  it('dispatches a project unselected action', () => {
    subject.removeProject('some-tray-id', ['some-project-id'])

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.ProjectUnselected,
      trayId: 'some-tray-id',
      projectIds: ['some-project-id']
    })
  })
})
