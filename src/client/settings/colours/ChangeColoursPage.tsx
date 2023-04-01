import type { ReactElement } from 'react'
import { useState } from 'react'
import { Page } from '../../common/Page'
import { Form } from '../../common/forms/Form'
import { ScaleText } from '../../common/ScaleText'
import { ColourPicker } from '../../common/forms/ColourPicker'
import { PaintFormat } from '../../common/icons/PaintFormat'
import styles from './change-colours-page.scss'

interface ChangePrognosisColoursPage {
  readonly title: string
  readonly onSuccess: (backgroundColour: string, textColour: string) => string
  readonly onCancel: string
  readonly initialBackgroundColour: string
  readonly initialTextColour: string
}

export function ChangeColoursPage({
  title,
  onSuccess,
  onCancel,
  initialTextColour,
  initialBackgroundColour,
}: ChangePrognosisColoursPage): ReactElement {
  const [text, setText] = useState(initialTextColour)
  const [background, setBackground] = useState(initialBackgroundColour)

  const onSuccessInternal = () => {
    return { navigateTo: onSuccess(background, text) }
  }

  return (
    <Page title={`Change ${title} colours`} icon={<PaintFormat />}>
      <Form onSuccess={onSuccessInternal} onCancel={onCancel}>
        {() => {
          return (
            <div className={styles.container}>
              <ColourPicker
                value={background}
                onChange={({ target }) => setBackground(target.value)}
                classNameContainer={styles.picker}
              >
                Background colour
              </ColourPicker>
              <ColourPicker
                value={text}
                onChange={({ target }) => setText(target.value)}
                classNameContainer={styles.picker}
              >
                Text colour
              </ColourPicker>
            </div>
          )
        }}
      </Form>
      <div
        className={styles.preview}
        style={{ color: text, backgroundColor: background }}
      >
        <ScaleText sentences={['preview']}>preview</ScaleText>
      </div>
    </Page>
  )
}
