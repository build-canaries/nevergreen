import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { RoutePaths } from '../../AppRoutes'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { Plus } from '../../common/icons/Plus'
import { PaintFormat } from '../../common/icons/PaintFormat'
import { Bin } from '../../common/icons/Bin'
import { InfoMessages } from '../../common/Messages'

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
        <HelpInput name="Change colours" icon={<PaintFormat />}>
          Allows changing of the background and text colour.
        </HelpInput>
        <HelpInput name="Add message" icon={<Plus />}>
          Adds a new success message.
        </HelpInput>
      </HelpForm>
      <InfoMessages
        messages={[
          'A random success message will be displayed on the Monitor page when there are no interesting projects. If no success messages are added then a blank screen will be shown.',
        ]}
      />
      <p>Added messages will appear and can be managed from this page.</p>
      <HelpForm>
        <HelpInput name="Remove" icon={<Bin />}>
          This will permanently delete the message. Messages can be re-added at
          any time.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
