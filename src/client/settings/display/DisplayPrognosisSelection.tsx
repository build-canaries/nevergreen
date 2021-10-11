import React, {ReactElement} from 'react'
import {Prognosis} from '../../domain/Project'
import {Checkbox} from '../../common/forms/Checkbox'
import styles from './display-prognosis-selection.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getShowPrognosis} from '../SettingsReducer'
import {setShowPrognosis} from '../SettingsActionCreators'

export function DisplayPrognosisSelection(): ReactElement {
  const dispatch = useDispatch()
  const showPrognosis = useSelector(getShowPrognosis)

  return (
    <fieldset className={styles.container}>
      <legend>Interesting projects</legend>
      <div className={styles.options} data-locator='show-prognosis-container'>
        {
          Object.values(Prognosis)
            .filter((prognosis) => prognosis !== Prognosis.error)
            .map((prognosis) => {
              return (
                <Checkbox key={prognosis}
                          className={styles.checkbox}
                          checked={showPrognosis.includes(prognosis)}
                          onToggle={(newValue) => dispatch(setShowPrognosis(prognosis, newValue))}
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
