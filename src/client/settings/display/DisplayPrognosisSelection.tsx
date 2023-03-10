import type { ReactElement } from 'react'
import { Prognosis, prognosisDisplay } from '../../domain/Project'
import { Checkbox } from '../../common/forms/Checkbox'
import {
  getSettings,
  getShowPrognosis,
  setPrognosisBackgroundColour,
  setPrognosisTextColour,
  setShowPrognosis,
} from '../SettingsReducer'
import capitalize from 'lodash/capitalize'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { Group } from '../../common/forms/Group'
import { ColourPicker } from '../../common/forms/ColourPicker'
import cn from 'classnames'
import styles from './display-prognosis-selection.scss'

function groupTitle(prognosis: Prognosis): string {
  if (prognosis === Prognosis.error) {
    return 'Errors'
  } else {
    return `${capitalize(prognosisDisplay(prognosis))} projects`
  }
}

export function DisplayPrognosisSelection(): ReactElement {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(getSettings)
  const showing = useAppSelector(getShowPrognosis)

  return (
    <div className={styles.container}>
      {Object.values(Prognosis).map((prognosis) => {
        const isError = prognosis === Prognosis.error
        return (
          <Group title={groupTitle(prognosis)} key={prognosis}>
            {!isError && (
              <Checkbox
                className={styles.checkbox}
                checked={showing.includes(prognosis)}
                onToggle={(show) =>
                  dispatch(setShowPrognosis({ prognosis, show }))
                }
              >
                Show on the Monitor page
              </Checkbox>
            )}
            <div className={styles.colours}>
              <ColourPicker
                classNameContainer={cn({ [styles.checkbox]: isError })}
                value={settings[prognosis].backgroundColour}
                onChange={({ target }) =>
                  dispatch(
                    setPrognosisBackgroundColour({
                      prognosis,
                      colour: target.value,
                    })
                  )
                }
              >
                Background colour
              </ColourPicker>
              <ColourPicker
                classNameContainer={cn({ [styles.checkbox]: isError })}
                value={settings[prognosis].textColour}
                onChange={({ target }) =>
                  dispatch(
                    setPrognosisTextColour({ prognosis, colour: target.value })
                  )
                }
              >
                Text colour
              </ColourPicker>
            </div>
          </Group>
        )
      })}
    </div>
  )
}
