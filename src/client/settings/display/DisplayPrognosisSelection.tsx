import type { ReactElement } from 'react'
import { Prognosis, prognosisDisplay } from '../../domain/Project'
import {
  getDisplaySettings,
  getShowPrognosis,
  setShowPrognosis,
} from './DisplaySettingsReducer'
import capitalize from 'lodash/capitalize'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { Card } from '../../common/card/Card'
import { CardHeading } from '../../common/card/CardHeading'
import { Checkbox } from '../../common/forms/Checkbox'
import { ChangeColoursLink } from '../colours/ChangeColoursLink'
import { Group } from '../../common/forms/Group'
import { IconPrognosis } from '../../common/icons/prognosis/IconPrognosis'
import styles from './display-prognosis-selection.scss'

function groupTitle(prognosis: Prognosis): string {
  return `${capitalize(prognosisDisplay(prognosis))} prognosis`
}

export function DisplayPrognosisSelection(): ReactElement {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(getDisplaySettings)
  const showing = useAppSelector(getShowPrognosis)

  return (
    <div className={styles.container}>
      <Card
        header={
          <CardHeading
            title="Errors"
            icon={<IconPrognosis prognosis={Prognosis.error} />}
          />
        }
        styleHeader={{
          color: settings[Prognosis.error].textColour,
          backgroundColor: settings[Prognosis.error].backgroundColour,
        }}
      >
        <ChangeColoursLink
          path={Prognosis.error}
          additionalContext="for errors"
        />
      </Card>
      {Object.values(Prognosis)
        .filter((prognosis) => prognosis !== Prognosis.error)
        .map((prognosis) => {
          return (
            <Card
              header={
                <CardHeading
                  title={groupTitle(prognosis)}
                  icon={<IconPrognosis prognosis={prognosis} />}
                />
              }
              styleHeader={{
                color: settings[prognosis].textColour,
                backgroundColor: settings[prognosis].backgroundColour,
              }}
              key={prognosis}
            >
              <Group title={groupTitle(prognosis)}>
                <Checkbox
                  className={styles.checkbox}
                  checked={showing.includes(prognosis)}
                  onToggle={(show) =>
                    dispatch(setShowPrognosis({ prognosis, show }))
                  }
                >
                  Show on the Monitor page
                </Checkbox>
                <ChangeColoursLink
                  path={prognosis}
                  additionalContext={`for ${prognosisDisplay(
                    prognosis,
                  )} prognosis`}
                />
              </Group>
            </Card>
          )
        })}
    </div>
  )
}
