import {Migrate} from './index'
import {isObject, unset} from 'lodash'
import {forEachArrayAt} from '../Migrate'
import {PROJECTS_ROOT} from '../../tracking/ProjectsReducer'
import {isBlank} from '../../common/Utils'

export const id = '007_SetProjectDescription'

export const migrate: Migrate = (data) => {
  forEachArrayAt(data, PROJECTS_ROOT, (projects) => {
    projects.forEach((project) => {
      if (isObject(project)) {
        project.description = isBlank(project.stage) ? project.name : `${project.name} ${project.stage}`
        unset(project, 'name')
        unset(project, 'stage')
      }
    })
  })
}
