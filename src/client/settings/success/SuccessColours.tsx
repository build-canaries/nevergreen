import type { ReactElement } from 'react'
import {
  getSuccessBackgroundColour,
  getSuccessTextColour,
  setSuccessBackgroundColour,
  setSuccessTextColour,
} from './SuccessReducer'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { ColourPicker } from '../../common/forms/ColourPicker'
import { Group } from '../../common/forms/Group'
import styles from './success-colours.scss'

export function SuccessColours(): ReactElement {
  const backgroundColour = useAppSelector(getSuccessBackgroundColour)
  const textColour = useAppSelector(getSuccessTextColour)
  const dispatch = useAppDispatch()

  return (
    <Group title="Colours" className={styles.container}>
      <ColourPicker
        value={backgroundColour}
        onChange={({ target }) =>
          dispatch(setSuccessBackgroundColour(target.value))
        }
        classNameContainer={styles.picker}
      >
        Background colour
      </ColourPicker>
      <ColourPicker
        value={textColour}
        onChange={({ target }) => dispatch(setSuccessTextColour(target.value))}
        classNameContainer={styles.picker}
      >
        Text colour
      </ColourPicker>
    </Group>
  )
}
