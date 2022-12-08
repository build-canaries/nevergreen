import { forEachObjectAt } from '../Migrate'
import { Migrate } from './index'
import set from 'lodash/set'

export const id = '003_FlattenProjects.ts'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, 'projects', (projects, trayId) => {
    set(data, ['projects', trayId], Object.values(projects))
  })
}
