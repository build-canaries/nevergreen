import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/ProjectsReducer'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  SET_TRAY_ID,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, List, Map} from 'immutable'

describe('ProjectsReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INITIALISED, function () {

    it('should set the projects data', function () {
      const existingState = Map({id: 'x'})
      const action = {type: INITIALISED, data: Map({projects: {foo: 'bar'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('id')
      expect(newState).to.have.property('foo', 'bar')
    })

    it('should handle no projects data', function () {
      const existingState = Map()
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.be.empty()
    })
  })

  describe(IMPORT_SUCCESS, function () {

    it('should set the projects data', function () {
      const existingState = Map({id: 'x'})
      const action = {type: IMPORT_SUCCESS, data: Map({projects: {foo: 'bar'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('id')
      expect(newState).to.have.property('foo', 'bar')
    })
  })

  describe(TRAY_ADDED, function () {

    it('should add a tray id property', function () {
      const existingState = fromJS()
      const action = {type: TRAY_ADDED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.is.empty()
    })
  })

  describe(REMOVE_TRAY, function () {

    it('should delete the tray id property', function () {
      const existingState = fromJS({trayId: {}})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('trayId')
    })
  })

  describe(PROJECTS_FETCHED, function () {

    it('should filter removed projects', function () {
      const existingState = fromJS({trayId: {projectId: {removed: true}}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', data: List()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.is.empty()
    })

    it('should set existing (non filtered) projects as old', function () {
      const existingState = fromJS({trayId: {projectId: {isNew: true}}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', data: List()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('projectId').that.has.property('isNew', false)
    })

    it('should set existing (non filtered) projects as removed if they haven\'t been fetched again', function () {
      const existingState = fromJS({trayId: {projectId: {removed: false}}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', data: List()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('projectId').that.has.property('removed', true)
    })

    it('should add newly fetched projects with the is new property', function () {
      const existingState = fromJS({trayId: {}})
      const action = {
        type: PROJECTS_FETCHED,
        trayId: 'trayId',
        data: fromJS([{projectId: 'projectId'}])
      }
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('projectId').that.has.property('isNew', true)
    })

    it('should mark existing projects that have been fetched again as old', function () {
      const existingState = fromJS({trayId: {projectId: {}}})
      const action = {
        type: PROJECTS_FETCHED,
        trayId: 'trayId',
        data: fromJS([{projectId: 'projectId'}])
      }
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('projectId').that.has.property('isNew', false)
    })

    it('should mark existing projects that have been fetched again as not removed', function () {
      const existingState = fromJS({trayId: {projectId: {}}})
      const action = {
        type: PROJECTS_FETCHED,
        trayId: 'trayId',
        data: fromJS([{projectId: 'projectId'}])
      }
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('projectId').that.has.property('removed', false)
    })
  })

  describe(SET_TRAY_ID, function () {

    it('should update the key in the state to the new tray id', function () {
      const existingState = fromJS({trayId: {}})
      const action = {type: SET_TRAY_ID, originalTrayId: 'trayId', newTrayId: 'some-new-url', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('some-new-url')
      expect(newState).to.not.have.property('trayId')
    })
  })
})
