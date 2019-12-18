import {forEachArrayAt} from '../Migrate'
import {Migrate} from './index'
import {PROJECTS_ROOT} from '../../tracking/ProjectsReducer'
import {isObject} from 'lodash'

export const id = '004_AddTrayIdToProjects'

export const migrate: Migrate = (data) => {
  forEachArrayAt(data, PROJECTS_ROOT, (projects, trayId) => {
    projects.forEach((project) => {
      if (isObject(project)) {
        project.trayId = trayId
      }
    })
  })
}
