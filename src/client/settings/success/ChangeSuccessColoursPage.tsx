import type { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { ROUTE_SUCCESS } from '../../AppRoutes'
import { ChangeColoursPage } from '../colours/ChangeColoursPage'
import {
  getSuccessBackgroundColour,
  getSuccessTextColour,
  setSuccessBackgroundColour,
  setSuccessTextColour,
} from './SuccessReducer'

export function ChangeSuccessColoursPage(): ReactElement {
  const dispatch = useAppDispatch()
  const initialBackgroundColour = useAppSelector(getSuccessBackgroundColour)
  const initialTextColour = useAppSelector(getSuccessTextColour)

  const onSuccess = (backgroundColour: string, textColour: string) => {
    dispatch(setSuccessBackgroundColour(backgroundColour))
    dispatch(setSuccessTextColour(textColour))
    return ROUTE_SUCCESS
  }

  return (
    <ChangeColoursPage
      title="success"
      onSuccess={onSuccess}
      onCancel={ROUTE_SUCCESS}
      initialBackgroundColour={initialBackgroundColour}
      initialTextColour={initialTextColour}
      group="success"
    />
  )
}
