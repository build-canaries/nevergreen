import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { RoutePaths } from '../../AppRoutes'
import { Play } from '../../common/icons/Play'
import { Stop } from '../../common/icons/Stop'
import { ExternalLink } from '../../common/ExternalLink'

const keywords = [
  'settings',
  'notifications',
  'desktop notifications',
  'show system notifications',
  'audio',
  'play audio notifications',
  'prognosis',
  'interesting projects',
]

export function PrognosisEditPageHelp({
  searchQuery,
  helpLink,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Edit prognosis"
      page={RoutePaths.prognosisEdit}
    >
      <HelpForm>
        <HelpInput name="Show on Monitor page">
          When <em>enabled</em> the corresponding prognosis will be displayed on
          the Monitor page.
        </HelpInput>
        <p>
          The following options are only available if &quot;Show on Monitor
          page&quot; is <em>enabled</em>.
        </p>
        <HelpInput name="Show system notification">
          When <em>enabled</em> a system (aka desktop) notifications will be
          shown when a project first transitions to this prognosis.
        </HelpInput>
        <HelpInput name="Play audio notification">
          When set to a audio URL it will be played when a project first
          transitions to this prognosis. It is recommended to use short sound
          effects for notifications.
        </HelpInput>
        <HelpInput name="Play" icon={<Play />}>
          Plays the inputted audio file URL. Displays an error message if the
          URL can not be played for any reason. Saving does not check the URL
          points to a valid playable audio file, so it is recommended to
          manually test before saving.
        </HelpInput>
        <HelpInput name="Stop" icon={<Stop />}>
          Stops the playing audio.
        </HelpInput>
        <HelpInput name="Background colour">
          Changes the background colour displayed on the Monitor page.
        </HelpInput>
        <HelpInput name="Text colour">
          Changes the text/foreground colour displayed on the Monitor page.
        </HelpInput>
      </HelpForm>
      <p>
        A visual preview of the currently selected colours is shown. The preview
        shows the lightness contrast (L<sup>c</sup>) which is calculated using
        the{' '}
        <ExternalLink href="https://git.apcacontrast.com/documentation/WhyAPCA">
          Accessible Perceptual Contrast Algorithm
        </ExternalLink>
        . The L<sup>c</sup> ranges from 0 to 108 and in general the higher the L
        <sup>c</sup> the more readable the colour combination. A warning will be
        shown if the L<sup>c</sup> is lower than 60.
      </p>
      <p>
        To actually show or play notifications they need to be allowed{' '}
        {helpLink('allow')}. Notifications can still be set even if neither are
        allowed. This allows system and/or audio notifications to be temporarily
        stopped without needing to update each prognosis.
      </p>
    </HelpArticle>
  )
}
