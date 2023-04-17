import { ReactElement } from 'react'
import { Prognosis } from '../../domain/Project'
import { SecondaryButton } from '../../common/forms/Button'
import { Group } from '../../common/forms/Group'
import styles from './presets.scss'

type Group = Prognosis | 'success'
type Name = 'Default' | 'Dead Cells' | 'Melatonin'

interface Preset {
  readonly name: Name
  readonly group: Group
  readonly background: string
  readonly text: string
}

interface PresetsProps {
  readonly group: Group
  readonly setBackgroundColour: (colour: string) => void
  readonly setTextColour: (colour: string) => void
}

const presets: ReadonlyArray<Preset> = [
  {
    group: Prognosis.error,
    name: 'Default',
    background: '#de3535',
    text: '#ffffff',
  },
  {
    group: Prognosis.error,
    name: 'Dead Cells',
    background: '#c42319',
    text: '#dffffe',
  },
  {
    group: Prognosis.error,
    name: 'Melatonin',
    background: '#f09fe9',
    text: '#000000',
  },
  {
    group: Prognosis.sick,
    name: 'Default',
    background: '#b30400',
    text: '#fffed7',
  },
  {
    group: Prognosis.sick,
    name: 'Dead Cells',
    background: '#860c35',
    text: '#dffffe',
  },
  {
    group: Prognosis.sick,
    name: 'Melatonin',
    background: '#bdb3ff',
    text: '#412a4d',
  },
  {
    group: Prognosis.sickBuilding,
    name: 'Default',
    background: '#d14904',
    text: '#ffffff',
  },
  {
    group: Prognosis.sickBuilding,
    name: 'Dead Cells',
    background: '#fec3fe',
    text: '#000000',
  },
  {
    group: Prognosis.sickBuilding,
    name: 'Melatonin',
    background: '#e3d6ff',
    text: '#412a4d',
  },
  {
    group: Prognosis.healthyBuilding,
    name: 'Default',
    background: '#ffff18',
    text: '#4a2f27',
  },
  {
    group: Prognosis.healthyBuilding,
    name: 'Dead Cells',
    background: '#04cff2',
    text: '#000000',
  },
  {
    group: Prognosis.healthyBuilding,
    name: 'Melatonin',
    background: '#abc3ff',
    text: '#412a4d',
  },
  {
    group: Prognosis.unknown,
    name: 'Default',
    background: '#ececec',
    text: '#000000',
  },
  {
    group: Prognosis.unknown,
    name: 'Dead Cells',
    background: '#f9cf87',
    text: '#0a3659',
  },
  {
    group: Prognosis.unknown,
    name: 'Melatonin',
    background: '#fdf0d9',
    text: '#000000',
  },
  {
    group: Prognosis.healthy,
    name: 'Default',
    background: '#058943',
    text: '#ffffff',
  },
  {
    group: Prognosis.healthy,
    name: 'Dead Cells',
    background: '#00326d',
    text: '#dffffe',
  },
  {
    group: Prognosis.healthy,
    name: 'Melatonin',
    background: '#818efd',
    text: '#ffffff',
  },
  {
    group: 'success',
    name: 'Default',
    background: '#000000',
    text: '#fffed7',
  },
  {
    group: 'success',
    name: 'Dead Cells',
    background: '#101524',
    text: '#f9cf87',
  },
  {
    group: 'success',
    name: 'Melatonin',
    background: '#3f294c',
    text: '#fcecef',
  },
]

export function Presets({
  group,
  setBackgroundColour,
  setTextColour,
}: PresetsProps): ReactElement {
  return (
    <Group title="Presets">
      <div className={styles.group}>
        {presets
          .filter((preset) => preset.group === group)
          .map((preset) => {
            return (
              <SecondaryButton
                key={preset.name}
                className={styles.button}
                onClick={() => {
                  setBackgroundColour(preset.background)
                  setTextColour(preset.text)
                }}
              >
                {preset.name}
              </SecondaryButton>
            )
          })}
      </div>
    </Group>
  )
}
