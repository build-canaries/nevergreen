import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { WarningMessages } from '../../common/Messages'
import { calcAPCA } from 'apca-w3'
import { ScaleText } from '../../common/ScaleText'
import styles from './contrast-checker.scss'

interface ContrastCheckerProps {
  readonly backgroundColour: string
  readonly textColour: string
}

export function ContrastChecker({
  textColour,
  backgroundColour,
}: ContrastCheckerProps): ReactElement {
  const [lightnessContrast, setLightnessContrast] = useState(0)

  useEffect(() => {
    const lc = calcAPCA(textColour, backgroundColour) as number
    setLightnessContrast(Math.abs(lc))
  }, [textColour, backgroundColour])

  const lowContrast = lightnessContrast < 60
  const previewText = `Lightness contrast ${lightnessContrast.toFixed(1)}`

  return (
    <>
      {lowContrast && (
        <WarningMessages
          messages={[
            'The chosen colours have a low perceptual lightness contrast.',
            'You should consider picking different colours to improve readability.',
          ]}
        />
      )}
      <div
        className={styles.preview}
        style={{ color: textColour, backgroundColor: backgroundColour }}
      >
        <ScaleText sentences={[previewText]}>{previewText}</ScaleText>
      </div>
    </>
  )
}
