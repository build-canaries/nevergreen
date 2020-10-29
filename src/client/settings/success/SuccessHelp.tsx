import React, {ReactElement} from 'react'
import {ExternalLink} from '../../common/ExternalLink'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'

const KEYWORDS = [
  'success',
  'messages',
  'images',
  'add',
  'url',
  'jpeg',
  'gif',
  'png'
]

export function SuccessHelp({searchQuery, helpLink}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Success messages'
                 page='/settings'>
      <p>
        You can add text messages or any <ExternalLink
        href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Supported_image_formats'>valid image
        URLs</ExternalLink>, one of these will get randomly displayed when no interesting projects are displayed on the
        Monitor page {helpLink('monitor')}.
      </p>
      <p>
        Messages are previewed in a 16:9 ratio which is how they would look on a full HD TV (1920x1080).
      </p>
      <p>Need some inspiration?</p>
      <p>
        Try searching for some <ExternalLink href='https://duckduckgo.com/?q=nature+1920x1080&iax=1&ia=images'>nice
        images</ExternalLink> or checkout <ExternalLink href='http://www.disapprovallook.com/'>Disapproval
        Look</ExternalLink> for some fun messages, like jelly guy! <span style={{whiteSpace: 'nowrap'}}>༼ つ◕_◕ ༽つ</span>
      </p>
    </HelpArticle>
  )
}
