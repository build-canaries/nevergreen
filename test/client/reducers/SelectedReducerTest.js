import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/SelectedReducer'
import {INITIALISED} from '../../../src/client/actions/NevergreenActions'
import {IMPORT_SUCCESS} from '../../../src/client/actions/ImportActions'
import {PROJECTS_FETCHED, REMOVE_TRAY, SELECT_PROJECT, SET_TRAY_ID, TRAY_ADDED} from '../../../src/client/actions/TrackingActions'
import Immutable from 'immutable'

describe('SelectedReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialised action', function () {

    it('should set the selected data', function () {
      const existingState = Immutable.Map({oldId: ['foo']})
      const action = {type: INITIALISED, data: Immutable.fromJS({selected: {trayId: ['bar']}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('oldId')
      expect(newState).to.have.property('trayId').that.is.an.instanceof(Immutable.Set).that.contains('bar')
    })

    it('should handle no selected data', function () {
      const existingState = Immutable.Map({oldId: ['foo']})
      const action = {type: INITIALISED, data: Immutable.Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('oldId')
    })
  })

  describe('imported data action', function () {

    it('should set the selected data', function () {
      const existingState = Immutable.Map({oldId: ['foo']})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({selected: {trayId: ['bar']}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('oldId')
      expect(newState).to.have.property('trayId').that.is.an.instanceof(Immutable.Set).that.contains('bar')
    })
  })

  describe('tray add action', function () {

    it('should add the tray id with an empty set of selected projects', function () {
      const existingState = Immutable.Map()
      const action = {type: TRAY_ADDED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.is.an.instanceof(Immutable.Set).that.is.empty
    })
  })

  describe('remove tray action', function () {

    it('should remove the tray id', function () {
      const existingState = Immutable.Map({trayId: Immutable.Set()})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('trayId')
    })
  })

  describe('select project action', function () {

    it('should add the project web url if selected', function () {
      const existingState = Immutable.Map({trayId: Immutable.Set('a', 'b', 'c')})
      const action = {type: SELECT_PROJECT, trayId: 'trayId', projectId: 'd', selected: true}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.contains('d')
    })

    it('should remove the project web url if not selected', function () {
      const existingState = Immutable.Map({trayId: Immutable.Set(['a', 'b', 'c'])})
      const action = {type: SELECT_PROJECT, trayId: 'trayId', projectId: 'b', selected: false}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.contains('b')
    })
  })

  describe('projects fetched action', function () {

    it('should remove selected projects that were not fetched', function () {
      const existingState = Immutable.Map({trayId: Immutable.Set(['a', 'b', 'c'])})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', data: Immutable.fromJS([{projectId: 'b'}])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.contains('b').and.have.size(1)
    })
  })

  describe('set url action', function () {

    it('should update the key in the state to the new tray id', function () {
      const existingState = Immutable.fromJS({trayId: Immutable.Set()})
      const action = {type: SET_TRAY_ID, originalTrayId: 'trayId', newTrayId: 'some-new-url', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('some-new-url')
      expect(newState).to.not.have.property('trayId')
    })
  })
})
