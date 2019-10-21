import {forEachObjectAt, Migration} from '../Migrate'
import {PROJECTS_ROOT} from '../../tracking/ProjectsReducer'
import {set} from 'lodash'

export const id = '20191017123204_FlattenProjects.ts'

export const migrate: Migration = (data) => {
  forEachObjectAt(data, PROJECTS_ROOT, (projects, trayId) => {
    set(data, [PROJECTS_ROOT, trayId], Object.values(projects))
  })
}
