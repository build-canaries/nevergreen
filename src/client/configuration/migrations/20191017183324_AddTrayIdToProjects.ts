import {forEachArrayAt, Migration} from '../Migrate'
import {PROJECTS_ROOT} from '../../tracking/ProjectsReducer'
import {isObject} from 'lodash'
import {UntrustedData} from '../LocalRepository'

export const id = '20191017183324_AddTrayIdToProjects'

export const migrate: Migration = (data) => {
  forEachArrayAt(data, PROJECTS_ROOT, (projects, trayId) => {
    projects.forEach((project) => {
      if (isObject(project)) {
        (project as UntrustedData).trayId = trayId
      }
    })
  })
}
