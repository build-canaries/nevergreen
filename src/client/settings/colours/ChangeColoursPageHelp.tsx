import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { RoutePaths } from '../../AppRoutes'
import { ExternalLink } from '../../common/ExternalLink'

const keywords = [
  'colour',
  'settings',
  'display',
  'sick',
  'sick building',
  'healthy',
  'healthy building',
  'unknown',
  'success',
  'lightness contrast',
]

export function ChangeColoursPageHelp({
  searchQuery,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Change colours"
      page={RoutePaths.colours}
    >
      <HelpForm>
        <HelpInput name="Presets">
          These allow you to quickly select preset colour combinations. Choosing
          any preset will override the currently selected colours.
        </HelpInput>
        <HelpInput name="Background colour">
          Changes the background colour.
        </HelpInput>
        <HelpInput name="Text colour">
          Changes the text/foreground colour.
        </HelpInput>
      </HelpForm>
      <p>
        A visual preview of the currently selected colours is shown under the
        form. The preview shows the lightness contrast (L<sup>c</sup>) which is
        calculated using the{' '}
        <ExternalLink href="https://git.apcacontrast.com/documentation/WhyAPCA">
          Accessible Perceptual Contrast Algorithm
        </ExternalLink>
        . The L<sup>c</sup> ranges from 0 to 108 and in general the higher the L
        <sup>c</sup> the more readable the colour combination. A warning will be
        shown if the L<sup>c</sup> is lower than 60.
      </p>
      <p>
        Dead Cells preset colours are inspired by the video game{' '}
        <ExternalLink href="https://dead-cells.com/">Dead Cells</ExternalLink>,
        a rogue-lite, metroidvania action-platformer.
      </p>
      <p>
        Melatonin preset colours are inspired by the video game{' '}
        <ExternalLink href="https://www.halfasleep.games/melatonin/">
          Melatonin
        </ExternalLink>
        , a rhythm game about dreams and reality merging together.
      </p>
    </HelpArticle>
  )
}
