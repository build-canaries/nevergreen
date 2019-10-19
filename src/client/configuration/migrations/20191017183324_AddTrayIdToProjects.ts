import {hasObject, Migration} from '../Migrate'
import {PROJECTS_ROOT} from '../../tracking/ProjectsReducer'
import {get, isArray, isObject} from 'lodash'
import {UntrustedData} from '../LocalRepository'

export const id = '20191017183324_AddTrayIdToProjects'

export const migrate: Migration = (data) => {
  if (hasObject(data, PROJECTS_ROOT)) {
    Object.keys(get(data, PROJECTS_ROOT) as object).forEach((trayId) => {
      const projects = get(data, [PROJECTS_ROOT, trayId])
      if (isArray(projects)) {
        projects.forEach((project) => {
          if (isObject(project)) {
            (project as UntrustedData).trayId = trayId
          }
        })
      }
    })
  }
}
