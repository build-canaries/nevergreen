import {Map} from 'immutable'
import {IMPORT_SUCCESS, INITIALISED, PROJECTS_FETCHED, REMOVE_TRAY, TRAY_ADDED} from '../actions/Actions'
import {Project} from '../domain/Project'

export const PROJECTS_ROOT = 'projects'

const DEFAULT_STATE = Map()

export function reduce(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS: {
      const data = action.data.get(PROJECTS_ROOT)
      return data
        ? Map(data).map((projects) => projects.map((project) => new Project(project)))
        : state
    }

    case TRAY_ADDED:
      return state.set(action.trayId, Map())

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
