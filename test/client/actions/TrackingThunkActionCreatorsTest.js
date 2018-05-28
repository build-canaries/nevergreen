import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

describe('TrackingThunkActionCreators', function () {

  const trayAdded = mocks.spy()
  const setTrayId = mocks.spy()
  const encryptPassword = mocks.stub()
  const highlightTray = mocks.spy()
  const refreshTray = mocks.spy()
  const createId = mocks.stub()

  const {updateTrayId, addTray} = withMockedImports('client/actions/TrackingThunkActionCreators', {
    './TrackingActionCreators': {trayAdded, setTrayId, highlightTray},
    './PasswordThunkActionCreators': {encryptPassword},
    './RefreshThunkActionCreators': {refreshTray},
    '../domain/Tray': {createId}
  })

  describe('updateTrayId', function () {

    it('should dispatch set tray id', function () {
      const tray = {trayId: 'old-tray-id'}
      return testThunk(updateTrayId(tray, 'new-tray-id')).then(() => {
        expect(setTrayId).to.have.been.calledWith('old-tray-id', 'new-tray-id')
      })
    })

    it('should dispatch refresh tray', function () {
      const tray = {trayId: 'old-tray-id'}
      return testThunk(updateTrayId(tray, 'new-tray-id')).then(() => {
        expect(refreshTray).to.have.been.calledWith({...tray, trayId: 'new-tray-id'})
      })
    })
  })

  describe('addTray', function () {

    it('should dispatch highlight tray action if the tray already exists', function () {
      createId.withArgs('http://url').returns('some-id')

      return testThunk(addTray('http://url', 'irrelevant', 'irrelevant', ['some-id'])).then(() => {
        expect(highlightTray).to.have.been.calledWith('some-id')
      })
    })

    describe('tray does not exist already', function () {

      it('should dispatch tray added action', function () {
        createId.withArgs('http://url').returns('some-id')
        encryptPassword.resolves('irrelevant')

        return testThunk(addTray('http://url', 'some-username', 'irrelevant', [])).then(() => {
          expect(trayAdded).to.have.been.calledWith('some-id', 'http://url', 'some-username')
        })
      })

      it('should dispatch encrypt password if the password given is not blank', function () {
        createId.withArgs('http://url').returns('some-id')
        encryptPassword.resolves('irrelevant')

        return testThunk(addTray('http://url', 'some-username', 'some-password', [])).then(() => {
          expect(encryptPassword).to.have.been.calledWith('some-id', 'some-password')
        })
      })

      it('should dispatch refresh tray once the password is encrypted', function () {
        createId.withArgs('http://url').returns('some-id')
        encryptPassword.resolves('encrypted-password')

        return testThunk(addTray('http://url', 'some-username', 'some-password', [])).then(() => {
          expect(refreshTray).to.have.been.calledWith({
            trayId: 'some-id',
            url: 'http://url',
            username: 'some-username',
            password: 'encrypted-password'
          }, null, true)
        })
      })

      it('should dispatch refresh tray if the password is blank', function () {
        createId.withArgs('http://url').returns('some-id')

        return testThunk(addTray('http://url', 'some-username', '', [])).then(() => {
          expect(refreshTray).to.have.been.calledWith({
            trayId: 'some-id',
            url: 'http://url',
            username: 'some-username'
          }, null, true)
        })
      })
    })
  })
})
