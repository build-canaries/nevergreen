import React, { ReactElement } from 'react'
import { Prognosis, prognosisDisplay } from '../../domain/Project'
import { Checkbox } from '../../common/forms/Checkbox'
import styles from './display-prognosis-selection.scss'
import { useSelector } from 'react-redux'
import { getShowPrognosis, setShowPrognosis } from '../SettingsReducer'
import capitalize from 'lodash/capitalize'
import { useAppDispatch } from '../../configuration/Hooks'

export function DisplayPrognosisSelection(): ReactElement {
  const dispatch = useAppDispatch()
  const showPrognosis = useSelector(getShowPrognosis)

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
