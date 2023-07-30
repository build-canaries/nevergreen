import type { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import {
  getDisplaySettings,
  setPrognosisBackgroundColour,
  setPrognosisTextColour,
} from './DisplaySettingsReducer'
import { Prognosis, prognosisDisplay } from '../../domain/Project'
import { RoutePaths } from '../../AppRoutes'
import { ChangeColoursPage } from '../colours/ChangeColoursPage'

interface ChangePrognosisColoursPage {
  readonly prognosis: Prognosis
}

export function ChangePrognosisColoursPage({
  prognosis,
}: ChangePrognosisColoursPage): ReactElement {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(getDisplaySettings)

  const onSuccess = (backgroundColour: string, textColour: string) => {
    dispatch(
      setPrognosisBackgroundColour({ prognosis, colour: backgroundColour }),
    )
    dispatch(setPrognosisTextColour({ prognosis, colour: textColour }))
    return RoutePaths.display
  }

  return (
    <ChangeColoursPage
      title={prognosisDisplay(prognosis)}
      onSuccess={onSuccess}
      onCancel={RoutePaths.display}
      initialBackgroundColour={settings[prognosis].backgroundColour}
      initialTextColour={settings[prognosis].textColour}
      group={prognosis}
    />
  )
}
