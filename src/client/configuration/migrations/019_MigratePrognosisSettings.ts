import { Migrate } from './index'
import { moveData } from '../Migrate'
import { Prognosis, sortedPrognosisByPriority } from '../../domain/Project'
import isArray from 'lodash/isArray'
import get from 'lodash/get'
import set from 'lodash/set'
import unset from 'lodash/unset'

export const id = '019_MigratePrognosisSettings'

export const migrate: Migrate = (data) => {
  sortedPrognosisByPriority().forEach((prognosis) => {
    moveData(
      data,
      `notifications.notifications.${prognosis}`,
      `prognosis.${prognosis}`,
    )
    moveData(
      data,
      `settings.${prognosis}.backgroundColour`,
      `prognosis.${prognosis}.backgroundColour`,
    )
    moveData(
      data,
      `settings.${prognosis}.textColour`,
      `prognosis.${prognosis}.textColour`,
    )
  })
  unset(data, 'notifications.notifications')
  if (isArray(get(data, 'settings.showPrognosis'))) {
    ;(get(data, 'settings.showPrognosis') as unknown[]).forEach(
      (maybePrognosis) => {
        if (sortedPrognosisByPriority().includes(maybePrognosis as Prognosis)) {
          set(data, `prognosis.${maybePrognosis as Prognosis}.show`, true)
        }
      },
    )
    unset(data, 'settings.showPrognosis')
  }
}
