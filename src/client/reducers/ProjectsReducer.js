import Immutable from 'immutable'
import {TRAY_ADDED, REMOVE_TRAY, PROJECTS_FETCHED} from '../actions/TrackingActions'
import {INITIALISED} from '../actions/NevergreenActions'

const DefaultState = Immutable.Map()

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get('projects'))

    case TRAY_ADDED:
      return state.set(action.trayId, Immutable.Map())

    case REMOVE_TRAY:
      return state.delete(action.trayId)

    case PROJECTS_FETCHED: {
      const fetched = action.data.reduce((reduction, project) => {
        reduction[project.get('projectId')] = project.merge({isNew: true, removed: false})
        return reduction
      }, {})

      return state.update(action.trayId, (projects) => {
        return projects
          .filterNot((project) => project.get('removed'))
          .map((project) => project.merge({isNew: false, removed: true}))
          .mergeWith((previous, next) => {
            return previous.merge(next, {isNew: false, removed: false})
          }, fetched)
      })
    }

    default:
      return state
  }
}
