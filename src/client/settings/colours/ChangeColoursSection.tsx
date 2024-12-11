import { ReactElement } from 'react'
import { ColourPicker } from '../../common/forms/ColourPicker'
import { ScaleText } from '../../common/ScaleText'
import styles from './change-colours-section.scss'

interface ChangeColoursSectionProps {
  readonly text: string
  readonly setText: (value: string) => void
  readonly background: string
  readonly setBackground: (value: string) => void
  readonly lightnessContrast: number
}

export function ChangeColoursSection({
  text,
  setText,
  background,
  setBackground,
  lightnessContrast,
}: ChangeColoursSectionProps): ReactElement {
  const previewText = `Lightness contrast ${lightnessContrast.toFixed(1)}`

  return (
    <div className={styles.coloursContainer}>
      <div className={styles.coloursInputContainer}>
        <ColourPicker
          value={background}
          onChange={({ target }) => {
            setBackground(target.value)
          }}
        >
          Background colour
        </ColourPicker>
        <ColourPicker
          value={text}
          onChange={({ target }) => {
            setText(target.value)
          }}
        >
          Text colour
        </ColourPicker>
      </div>
      <div
        className={styles.preview}
        style={{ color: text, backgroundColor: background }}
      >
        <ScaleText sentences={[previewText]}>{previewText}</ScaleText>
      </div>
    </div>
  )
}
