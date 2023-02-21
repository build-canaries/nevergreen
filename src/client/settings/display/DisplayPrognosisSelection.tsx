import type { ReactElement } from 'react'
import { Prognosis, prognosisDisplay } from '../../domain/Project'
import { Checkbox } from '../../common/forms/Checkbox'
import { getShowPrognosis, setShowPrognosis } from '../SettingsReducer'
import capitalize from 'lodash/capitalize'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import styles from './display-prognosis-selection.scss'

export function DisplayPrognosisSelection(): ReactElement {
  const dispatch = useAppDispatch()
  const showPrognosis = useAppSelector(getShowPrognosis)

  return (
    <fieldset className={styles.container}>
      <legend>Interesting projects</legend>
      <div className={styles.options} data-locator="show-prognosis-container">
        {Object.values(Prognosis)
          .filter((prognosis) => prognosis !== Prognosis.error)
          .map((prognosis) => {
            return (
              <Checkbox
                key={prognosis}
                className={styles.checkbox}
                checked={showPrognosis.includes(prognosis)}
                onToggle={(show) =>
                  dispatch(setShowPrognosis({ prognosis, show }))
                }
                data-locator="show-prognosis"
              >
                {capitalize(prognosisDisplay(prognosis))}
              </Checkbox>
            )
          })}
      </div>
    </fieldset>
  )
}
