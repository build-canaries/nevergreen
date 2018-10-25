import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/SelectedReducer'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  SELECT_PROJECT,
  SET_TRAY_ID,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, Map, Set} from 'immutable'

describe('SelectedReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INITIALISED, function () {

    it('should set the selected data', function () {
      const existingState = Map({oldId: ['foo']})
      const action = {type: INITIALISED, data: fromJS({selected: {trayId: ['bar']}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('oldId')
      expect(newState).to.have.property('trayId').that.is.an.instanceof(Set).that.contains('bar')
    })

    it('should handle no selected data', function () {
      const existingState = Map({oldId: ['foo']})
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('oldId')
    })
  })

  describe(IMPORT_SUCCESS, function () {

    it('should set the selected data', function () {
      const existingState = Map({oldId: ['foo']})
      const action = {type: IMPORT_SUCCESS, data: fromJS({selected: {trayId: ['bar']}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('oldId')
      expect(newState).to.have.property('trayId').that.is.an.instanceof(Set).that.contains('bar')
    })
  })

  describe(TRAY_ADDED, function () {

    it('should add the tray id with an empty set of selected projects', function () {
      const existingState = Map()
      const action = {type: TRAY_ADDED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.is.an.instanceof(Set).that.is.empty()
    })
  })

  describe(REMOVE_TRAY, function () {

    it('should remove the tray id', function () {
      const existingState = Map({trayId: Set()})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('trayId')
    })
  })

  describe(SELECT_PROJECT, function () {

    it('should add the project web url if selected', function () {
      const existingState = Map({trayId: Set('a', 'b', 'c')})
      const action = {type: SELECT_PROJECT, trayId: 'trayId', projectId: 'd', selected: true}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.contains('d')
    })

    it('should remove the project web url if not selected', function () {
      const existingState = Map({trayId: Set(['a', 'b', 'c'])})
      const action = {type: SELECT_PROJECT, trayId: 'trayId', projectId: 'b', selected: false}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.contains('b')
    })
  })

  describe(PROJECTS_FETCHED, function () {

    it('should remove selected projects that were not fetched', function () {
      const existingState = Map({trayId: Set(['a', 'b', 'c'])})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', data: fromJS([{projectId: 'b'}])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.contains('b').and.have.size(1)
    })

    it('should add all projects that were fetched if select all is true', function () {
      const existingState = Map({trayId: Set([])})
      const fetchedProjects = fromJS([{projectId: 'a'}, {projectId: 'b'}, {projectId: 'c'}])
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', selectAll: true, data: fetchedProjects}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.contains('a', 'b', 'c')
    })
  })

  describe(SET_TRAY_ID, function () {

    it('should update the key in the state to the new tray id', function () {
      const existingState = fromJS({trayId: Set()})
      const action = {type: SET_TRAY_ID, originalTrayId: 'trayId', newTrayId: 'some-new-url', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('some-new-url')
      expect(newState).to.not.have.property('trayId')
    })
  })
})
