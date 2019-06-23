import React from 'react'
import {Prognosis} from '../domain/Project'
import {Checkbox} from '../common/forms/Checkbox'
import styles from './display-prognosis-selection.scss'

export interface DisplayPrognosisSelectionProps {
  showPrognosis: Prognosis[];
  setShowPrognosis: (prognosis: Prognosis, show: boolean) => void;
}

export function DisplayPrognosisSelection({showPrognosis, setShowPrognosis}: DisplayPrognosisSelectionProps) {
  return (
    <fieldset className={styles.container}>
      <legend className={styles.legend}>show prognoses</legend>
      <div data-locator='show-prognosis-container'>
        {
          Object.values(Prognosis).map((prognosis) => {
            return (
              <Checkbox key={prognosis}
                        className={styles.checkbox}
                        checked={showPrognosis.includes(prognosis)}
                        onToggle={(newValue) => setShowPrognosis(prognosis, newValue)}
                        data-locator='show-prognosis'>
                {prognosis.replace('-', ' ')}
              </Checkbox>
            )
          })
        }
      </div>
    </fieldset>
  )
}
