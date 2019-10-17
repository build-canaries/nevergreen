import {hasObject, Migration} from '../Migrate'
import {PROJECTS_ROOT} from '../../tracking/ProjectsReducer'
import {get, set} from 'lodash'

export const id = '20191017123204_FlattenProjects.ts'

export const migrate: Migration = (data) => {
  if (hasObject(data, PROJECTS_ROOT)) {
    Object.keys(get(data, PROJECTS_ROOT) as object).forEach((trayId) => {
      if (hasObject(data, [PROJECTS_ROOT, trayId])) {
        const projects = Object.keys(get(data, [PROJECTS_ROOT, trayId]))
          .map((projectId) => get(data, [PROJECTS_ROOT, trayId, projectId]))
        set(data, [PROJECTS_ROOT, trayId], projects)
      }
    })
  }
}
