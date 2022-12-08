import { Migrate } from './index'
import isObject from 'lodash/isObject'
import unset from 'lodash/unset'
import { forEachArrayAt } from '../Migrate'
import { isBlank } from '../../common/Utils'

export const id = '007_SetProjectDescription'

export const migrate: Migrate = (data) => {
  forEachArrayAt(data, 'projects', (projects) => {
    projects.forEach((project) => {
      if (isObject(project)) {
        project.description = isBlank(project.stage)
          ? project.name
          : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${project.name} ${project.stage}`
        unset(project, 'name')
        unset(project, 'stage')
      }
    })
  })
}
