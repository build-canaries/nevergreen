import type { ReactElement } from 'react'
import { ExternalLink } from '../../common/ExternalLink'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { RoutePaths } from '../../AppRoutes'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { Plus } from '../../common/icons/Plus'
import { PaintFormat } from '../../common/icons/PaintFormat'
import { Bin } from '../../common/icons/Bin'

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

export function SuccessHelp({
  searchQuery,
  helpLink,
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
          You can add text messages or any{' '}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Supported_image_formats">
            valid image URLs
          </ExternalLink>
          , one of these will get randomly displayed when no interesting
          projects are displayed on the Monitor page {helpLink('monitor')}. If
          no success messages are added then a blank screen will be shown.
        </HelpInput>
        <HelpInput name="Change colours" icon={<PaintFormat />}>
          Allows changing of the background and text colour.
        </HelpInput>
      </HelpForm>
      <p>Added messages will appear and can be managed from this page.</p>
      <HelpForm>
        <HelpInput name="Remove" icon={<Bin />}>
          This will permanently delete the message. Messages can be re-added at
          any time and you can also make a backup before removing{' '}
          {helpLink('backup')}.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
