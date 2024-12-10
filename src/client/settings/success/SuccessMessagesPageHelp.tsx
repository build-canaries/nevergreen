import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { RoutePaths } from '../../AppRoutes'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { Plus } from '../../common/icons/Plus'
import { Bin } from '../../common/icons/Bin'
import { InfoMessages } from '../../common/Messages'
import { ExternalLink } from '../../common/ExternalLink'

const keywords = [
  'success',
  'messages',
  'images',
  'add',
  'url',
  'jpeg',
  'gif',
  'png',
  'colour',
]

export function SuccessMessagesPageHelp({
  searchQuery,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Success messages"
      page={RoutePaths.success}
    >
      <HelpForm>
        <HelpInput name="Add message" icon={<Plus />}>
          Adds a new success message.
        </HelpInput>
      </HelpForm>
      <p>Added messages will appear and can be managed from this page.</p>
      <HelpForm>
        <HelpInput name="Remove" icon={<Bin />}>
          This will permanently delete the message. Messages can be re-added at
          any time.
        </HelpInput>
      </HelpForm>
      <HelpForm>
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
      <InfoMessages
        messages={[
          'A random success message will be displayed on the Monitor page when there are no interesting projects. If no success messages are added then a blank screen will be shown.',
        ]}
      />
    </HelpArticle>
  )
}
