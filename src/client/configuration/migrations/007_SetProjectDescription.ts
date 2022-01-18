import {Migrate} from './index'
import isObject from 'lodash/isObject'
import unset from 'lodash/unset'
import {forEachArrayAt} from '../Migrate'
import {PROJECTS_ROOT} from '../../settings/tracking/ProjectsReducer'
import {isBlank} from '../../common/Utils'

export const id = '007_SetProjectDescription'

export const migrate: Migrate = (data) => {
  forEachArrayAt(data, PROJECTS_ROOT, (projects) => {
    projects.forEach((project) => {
      if (isObject(project)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        project.description = isBlank(project.stage) ? project.name : `${project.name} ${project.stage}`
        unset(project, 'name')
        unset(project, 'stage')
      }
    })
  })
}
