import type { ReactElement } from 'react'
import { ExternalLink } from '../../common/ExternalLink'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { RoutePaths } from '../../AppRoutes'
import { HelpForm, HelpInput } from '../../help/HelpForms'

const keywords = [
  'success',
  'messages',
  'images',
  'add',
  'url',
  'jpeg',
  'gif',
  'png',
]

export function AddMessagePageHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Add success message"
      page={RoutePaths.successAdd}
    >
      <HelpForm>
        <HelpInput name="Message">
          You can add text messages or any{' '}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Supported_image_formats">
            valid image URLs
          </ExternalLink>
          .
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
