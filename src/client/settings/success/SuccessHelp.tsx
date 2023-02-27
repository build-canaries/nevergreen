import type { ReactElement } from 'react'
import { ExternalLink } from '../../common/ExternalLink'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { ROUTE_SUCCESS } from '../../AppRoutes'
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
      page={ROUTE_SUCCESS}
    >
      <HelpForm>
        <HelpInput name="Add message">
          You can add text messages or any{' '}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Supported_image_formats">
            valid image URLs
          </ExternalLink>
          , one of these will get randomly displayed when no interesting
          projects are displayed on the Monitor page {helpLink('monitor')}. If
          no success messages are added then a blank screen will be shown.
          <p>Added messages will appear and can be managed from this page.</p>
        </HelpInput>
        <HelpInput name="Colours">
          Changes the background or text colour success messages will be
          displayed with.
          <p>
            You should consider the{' '}
            <ExternalLink href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html">
              minimum contrast
            </ExternalLink>{' '}
            when changing colours to make sure they are easy to read.
          </p>
        </HelpInput>
      </HelpForm>
      <p>Need some inspiration?</p>
      <p>
        Try searching for some{' '}
        <ExternalLink href="https://duckduckgo.com/?q=nature+1920x1080&iax=1&ia=images">
          nice images
        </ExternalLink>{' '}
        or checkout{' '}
        <ExternalLink href="http://www.disapprovallook.com/">
          Disapproval Look
        </ExternalLink>{' '}
        for some fun messages, like jelly guy!{' '}
        <span style={{ whiteSpace: 'nowrap' }}>༼ つ◕_◕ ༽つ</span>
      </p>
    </HelpArticle>
  )
}
