import type { ReactElement } from 'react'
import { useState } from 'react'
import { Page } from '../../common/Page'
import { Form } from '../../common/forms/Form'
import { ColourPicker } from '../../common/forms/ColourPicker'
import { PaintFormat } from '../../common/icons/PaintFormat'
import { ContrastChecker } from './ContrastChecker'
import { Presets } from './Presets'
import { Prognosis } from '../../domain/Project'
import styles from './change-colours-page.scss'

interface ChangePrognosisColoursPageProps {
  readonly title: string
  readonly onSuccess: (backgroundColour: string, textColour: string) => string
  readonly onCancel: string
  readonly initialBackgroundColour: string
  readonly initialTextColour: string
  readonly group: Prognosis | 'success'
}

export function ChangeColoursPage({
  title,
  onSuccess,
  onCancel,
  initialTextColour,
  initialBackgroundColour,
  group,
}: ChangePrognosisColoursPageProps): ReactElement {
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
            <>
              <Presets
                group={group}
                setBackgroundColour={setBackground}
                setTextColour={setText}
              />
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
            </>
          )
        }}
      </Form>
      <ContrastChecker backgroundColour={background} textColour={text} />
    </Page>
  )
}
